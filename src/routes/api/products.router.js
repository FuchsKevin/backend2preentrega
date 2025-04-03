import { Router } from 'express';
import { authorizeRole } from '../../middlewares/authorizeRole.js';
import { ProductRepository } from '../../repositories/ProductRepository.js';

const router = Router();
const productRepository = new ProductRepository();

// Crear producto (solo admin)
router.post('/', authorizeRole('admin'), async (req, res) => {
    try {
        const newProduct = await productRepository.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
});

// Actualizar producto (solo admin)
router.put('/:id', authorizeRole('admin'), async (req, res) => {
    try {
        const updatedProduct = await productRepository.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});

// Eliminar producto (solo admin)
router.delete('/:id', authorizeRole('admin'), async (req, res) => {
    try {
        const deleted = await productRepository.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});

export { router as productsRouter };
