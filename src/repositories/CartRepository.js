import { Cart } from '../models/Cart.model.js';

export class CartRepository {
    async getCartById(id) {
        return await Cart.findById(id);
    }

    async create(cartData) {
        const cart = new Cart(cartData);
        await cart.save();
        return cart;
    }

    async updateCart(id, updateData) {
        return await Cart.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteCart(id) {
        return await Cart.findByIdAndDelete(id);
    }
}
