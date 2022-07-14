import Contenedor from './container/container.js';
import express from 'express';


const administrador = new Contenedor();

const app = express()
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("<h2> HOLA ESTAS ESTAS EN MI SERVIDOR </h2></br>1. /productos 'Array con todos los productos disponibles en el server'</br>2./productoRandom 'Producto random del servidor'")
})

app.get('/productos',async(req,res)=>{
   let obtenerTodo = await administrador.getAll()
    res.send(obtenerTodo);
})

app.get('/productoRandom',async(req,res) =>{
    let productoRandom = await administrador.getRandom()
    res.send(productoRandom)
})