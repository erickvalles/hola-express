import express from 'express'
import {engine} from 'express-handlebars'
import { getFrase, getFrasePelicula, getFraseGraciosa } from './lib/frases.js'


const app = express()

const port = process.env.port || 3000

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views','./views')

app.use(express.static('public'))



app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/motivacionales',(req,res)=>{
        res.render('about', {frase:getFrase()})
})
app.get('/graciosas',(req,res)=>{
    res.render('about', {frase:getFraseGraciosa()})
})

app.get('/peliculas',(req,res)=>{
    res.render('about', {frase:getFrasePelicula()})
})

app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})



app.listen(port, ()=>{
    console.log(`Express se ha iniciado en el puerto ${port}- Press Ctrl+c para terminar`)
})

