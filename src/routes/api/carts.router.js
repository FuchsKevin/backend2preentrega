import { CartRepository } from '../../repositories/CartRepository.js';
import { Ticket } from '../../models/Ticket.js';
import { Product } from '../../models/Product.model.js';  // Asegúrate de importar el modelo de Producto
import passport from 'passport';
import { generateUniqueCode } from '../../utils/codeGenerator.js';  // Asegúrate de tener un generador de códigos único

const cartRepository = new CartRepository();

sessionsRouter.post('/carts/:cid/purchase', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const cartId = req.params.cid;
    const userId = req.user.id;

    // Obtener el carrito y los productos
    const cart = await cartRepository.getCartById(cartId);
    
    if (!cart || cart.userId !== userId) {
        return res.status(404).json({ message: 'Carrito no encontrado o no autorizado' });
    }

    let totalAmount = 0;
    const productsToPurchase = [];
    const productsNotAvailable = [];

    // Verificar el stock de los productos
    for (let product of cart.products) {
        const productFromDb = await Product.findById(product.productId);
        
        if (productFromDb && productFromDb.stock >= product.quantity) {
            productFromDb.stock -= product.quantity;
            await productFromDb.save();
            totalAmount += productFromDb.price * product.quantity;
            productsToPurchase.push(product);
        } else {
            productsNotAvailable.push(product.productId);
        }
    }

    if (productsToPurchase.length === 0) {
        return res.status(400).json({ message: 'No hay productos disponibles para la compra', productsNotAvailable });
    }

    // Crear el ticket
    const ticket = new Ticket({
        code: generateUniqueCode(),
        amount: totalAmount,
        purchaser: req.user.email
    });

    await ticket.save();

    // Eliminar los productos comprados del carrito
    cart.products = cart.products.filter(product => !productsNotAvailable.includes(product.productId));
    await cart.save();

    res.json({ message: 'Compra realizada con éxito', ticket, productsNotAvailable });
});
