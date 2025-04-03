class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(p => ({
            productId: p.productId,
            quantity: p.quantity
        }));
    }
}

export default CartDTO;
