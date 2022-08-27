import express from 'express'
import {engine} from 'express-handlebars'


const app = express()

const port = process.env.port || 3000

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views','./views')

app.use(express.static('public'))

const frases = [
    "No se trata de si van a derribarte, se trata de si vas a levantarte cuando lo hagan» —Vince Lombardi, entrenador de fúbol americano",
    "Nadie puede hacerte sentir inferior sin tu consentimiento» —Eleanor Roosevelt",
    "Qué maravilloso es que nadie tenga que esperar ni un segundo para empezar a mejorar el mundo» —Ana Frank",
    "El pesimista ve dificultades en cada oportunidad. El optimista ve oportunidades en cada dificultad» —Winston Churchill",    
    "Muchos piensan en cambiar el mundo, pero casi nadie piensa en cambiarse a sí mismo» —Leon Tolstoi",
    "Si estás trabajando en algo que te importa de verdad, nadie tiene que empujarte: tu visión te empuja» —Steve Jobs"
]

const graciosas = [
"No soy vago, estoy en modo ahorro de energía",
"Lo malo no es vivir en las nubes, sino bajar",
"Odio ser bipolar, es una sensación fantástica",
"Previsión del tiempo para esta noche: estará oscuro",
"Las cuatro palabras más bonitas de nuestro idioma: ya te lo dije",
"Lo más cerca que una persona llega a la perfección es el día que rellena una solicitud de empleo",
"Un día sin sol es, ya sabes, de noche",
"No renuncies a tus sueños... Sigue durmiendo",
]

const frasesPeliculas = [
"“Descubre quién eres y hazlo a propósito” (Un verano para recordar).",
"“La muerte nos sonríe a todos, devolvámosle la sonrisa” (Gladiador).",
"“Prefiero ser un optimista loco antes que un pesimista sensato” (El genio del amor).",
"“Nací cuando ella me besó, morí el día que me abandonó, y viví el tiempo que me amó” (En un lugar solitario).",
"“Su perfume es una dulce promesa que hace aparecer lágrimas en mis ojos” (Sin city).",
"Nuestro amor es como el viento, no puedo verlo pero si sentirlo” (Un verano para recordar).",
"Enterramos nuestros pecados, lavamos nuestras conciencias (Río Místico)"
]

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/motivacionales',(req,res)=>{
    let fraseAleatoria = frases[Math.floor(Math.random()*frases.length)]
    res.render('about', {frase:fraseAleatoria})
})
app.get('/graciosas',(req,res)=>{
    let fraseAleatoria = graciosas[Math.floor(Math.random()*graciosas.length)]
    res.render('about', {frase:fraseAleatoria})
})

app.get('/peliculas',(req,res)=>{
    let fraseAleatoria = frasesPeliculas[Math.floor(Math.random()*frasesPeliculas.length)]
    res.render('about', {frase:fraseAleatoria})
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

