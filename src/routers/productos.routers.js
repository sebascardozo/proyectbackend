import { Router } from "express";
import Manager from "../container/container.js"
const manager  = new Manager();
const router = Router();

///GET '/api/productos' -> devuelve todos los productos.

router.get('/',async(req,res)=>{
    let obtenerTodo = await manager.getAll()
    res.send(obtenerTodo);
})

//GET '/api/productos/:id' -> devuelve un producto según id.

router.get('/api/productos/:id',async(req,res)=>{
    let Lista = await manager.getAll()
    if (req.query.id >Lista.length) {
        res.send("404 El valor pedido no existe")
    } else {
        let numero = req.query.id
        let obtenerId = await manager.getById(numero)
        res.send(obtenerId)
    }

})

//POST '/api/productos' -> recibe y agrega.

router.post('/',async(req,res)=>{
    let producto = req.body
    res.send({status:"succes", message:"Product Added"})
    await manager.save(producto)
})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según id.

router.put('/api/productos/:id',async(req,res)=>{
    let producto = req.body
   await manager.actualizar(producto)
})


//DELETE '/api/productos/:id' -> elimina un producto según id.
router.delete('/api/productos/:id',async(req,res)=>{
    let id = req.body
    res.send("Eliminado")
   await manager.deleteById(id.delete)
})





export default router;