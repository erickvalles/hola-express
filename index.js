import express from 'express'
import {engine} from 'express-handlebars'
import { getFrase, getFrasePelicula, getFraseGraciosa } from './lib/frases.js'


const app = express()

const port = process.env.port || 3000

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views','./views')
app.disable('x-powered-by')
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

app.get('/headers', (req,res)=>{
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key,value])=>`${key}:${value}`)
    res.send(headers.join('\n'))
})

app.get('/bloques',(req,res)=>{
    let datos = {
        alumnos:[
            {ap:"Guerrero",am:"Muñoz",nombre:"Erick",codigo:1235},
            {ap:"Guerrero",am:"Muñoz",nombre:"Jorge",codigo:1236},
            {ap:"Álvarez Tostado",am:"Martinez",nombre:"Erendira",codigo:1237},
        ],
        solicitudes:[
            {codigo:1235,detalle:"Quiero dar de baja una materia"}
        ]
        
    }

    res.render('solicitudes', {datos:datos})
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

