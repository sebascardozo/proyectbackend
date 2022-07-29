import { Router } from "express";
import Contenedor from "../container/container.js";
import { uploader } from '../utils.js';
 

const router = Router();
const productService = new Contenedor();

router
  .route('/')
    .get((req, res) => {
      res.render('productForm', {
        title: 'Add Product'
      })
    });

router
  .route('/products')
    .get(
      async (req, res) => {
        let products = await productService.getAll();
        res.render('productList', {
          title: 'Products',
          hasProducts: products.length > 0,
          products
        });
      }
    )
    .post(
      uploader.single('file'),
      async (req, res) => {
        let newProduct = req.body
        newProduct.thumbnail = req.file.filename
        if (!req.file) return res.status(500).json({ status: 'error', error: 'No se puede cargar' });
        if (!newProduct.title || !newProduct.price) return res.status(400).send({ status: 'error', error: 'Nombre y precio de producto requerido' });
        const savedProductId = await productService.save(newProduct);
        const savedProduct = await productService.getById(savedProductId);
        res.send({ status: 'success', message: `Producto agregado con ID: ${savedProductId}`, product: savedProduct });
      }
    );

export default router;