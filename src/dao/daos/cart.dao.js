import CartModel from "../models/Cart.js";

class CartDAO {
    async getCartById(id) {
        return await CartModel.findById(id).populate("products.productId");
    }

    async createCart(cartData) {
        return await CartModel.create(cartData);
    }

    async updateCart(id, cartData) {
        return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
    }

    async deleteCart(id) {
        return await CartModel.findByIdAndDelete(id);
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        return await cart.save();
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        cart.products = cart.products.filter(p => !p.productId.equals(productId));
        return await cart.save();
    }

    async clearCart(cartId) {
        return await CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
    }
}

export default CartDAO;
