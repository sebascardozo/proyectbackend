import { Router } from "express";
import Container from "../container/container.js"

const router = Router();
const ContainerService = new Container();

router.get('/', async (req, res) => {
    let objects = await ContainerService.getAll();

    res.send(objects)
});


router.get('/api/productos/:id', async (req, res) => {
    let idSearch = req.params.id;

    const error = 'INSERTAR NUMERO';
    if(isNaN(idSearch)) return res.status(400).send({error})

    let objectById = await ContainerService.getById(idSearch);

    res.send(objectById)
});


router.post('/',async(req,res)=>{
    let product = req.body;
    product.thumbnail = req.file.path;
    console.log(product)

    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await ContainerService.save(product);
    const objects = await ContainerService.getAll();

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';

    res.send({status:"REALIZADO", message:"PRODUCTO AGREGADO", id:sum })
});


router.put('/api/productos/:id', async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.id;
    let realNumber = parseInt(idSearch)

    let newArray = [];

    newArray.push(newObject);

    const error = 'INSERTAR NUMERO CORRECTO';
    if(isNaN(idSearch)) return res.status(400).send({error})

    let objectById = await ContainerService.getById(realNumber);

    objectById = newArray;

    res.send({status: 'NUEVO PRODUCTO AGREGADO', 'Nuevo producto': newArray});
});


router.delete('/api/productos/:id', async (req, res) => {
    let idDelete = req.params.id;
    let realNumber = parseInt(idDelete)

    const error = 'INSERTAR NUMERO CORRECTO';
    if(isNaN(idDelete)) return res.status(400).send({error})
    
    let deleteProductById = await ContainerService.deleteById(realNumber);

    res.send('PRODUCTO BORRADO')
});

export default router;