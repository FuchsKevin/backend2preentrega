import { Router } from 'express';
import { authMiddleware, authorizeRole } from '../../middlewares/auth.js';

import passport from 'passport';
import { User } from '../../models/User.model.js';
import { Product } from '../../models/Product.model.js'; 
import { Cart } from '../../models/Cart.model.js'; 

const sessionsRouter = Router();

// Rutas para administradores
sessionsRouter.post('/product', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), (req, res) => {
    // Lógica para crear un producto
    const { name, price, stock } = req.body;
    const newProduct = new Product({ name, price, stock });
    newProduct.save()
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).json({ message: "Error creando producto", error: err }));
});

sessionsRouter.put('/product/:id', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), (req, res) => {
    // Lógica para actualizar un producto
    const { name, price, stock } = req.body;
    Product.findByIdAndUpdate(req.params.id, { name, price, stock }, { new: true })
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(500).json({ message: "Error actualizando producto", error: err }));
});

sessionsRouter.delete('/product/:id', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), (req, res) => {
    // Lógica para eliminar un producto
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Producto eliminado" }))
        .catch(err => res.status(500).json({ message: "Error eliminando producto", error: err }));
});

// Ruta para usuarios (agregar al carrito)
sessionsRouter.post('/cart', passport.authenticate('jwt', { session: false }), authorizeRole('user'), (req, res) => {
    // Lógica para agregar un producto al carrito
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    Cart.findOne({ userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity; // Si ya existe el producto, aumentamos la cantidad
            } else {
                cart.products.push({ productId, quantity });
            }

            return cart.save();
        })
        .then(updatedCart => res.json(updatedCart))
        .catch(err => res.status(500).json({ message: "Error agregando producto al carrito", error: err }));
});

export { sessionsRouter };
