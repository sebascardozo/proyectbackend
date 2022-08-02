import { Router } from 'express';
import Contenedor from '../container/container.js';
import { uploader } from '../utils.js';

const router = Router();
const productService = new Contenedor();

router
  .route('/api')
    .get(
      async (req, res) => {
        let products = await productService.getAll();
        res.send({ products })
      }
    )
    .post(
      uploader.single('file'),
      async (req, res) => {
        let newProduct = req.body
        newProduct.thumbnail = req.file.filename
        if (!req.file) return res.status(500).json({ status: 'error', error: 'No se puede subir el archivo' });
        if (!newProduct.title || !newProduct.price) return res.status(400).send({ status: 'error', error: 'Product name and price are required' })
        const savedProductId = await productService.save(newProduct);
        const savedProduct = await productService.getById(savedProductId);
        const io = req.app.get('socketio');
        io.emit('fetchProducts');
        io.emit('newProduct', socket.id);
        res.send({ status: 'success', message: `Producto agregado: ${savedProductId}`, product: savedProduct });
      }
    );

export default router;