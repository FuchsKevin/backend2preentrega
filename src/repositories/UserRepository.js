import UserDAO from '../dao/daos/UserDAO.js';


import UserDTO from '../dto/UserDTO.js';


class UserRepository {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async getUserById(id) {
        const user = await this.userDAO.getById(id);
        return user ? new UserDTO(user) : null;
    }

    async getUserByEmail(email) {
        const user = await this.userDAO.getByEmail(email);
        return user ? new UserDTO(user) : null;
    }

    async createUser(userData) {
        const user = await this.userDAO.create(userData);
        return new UserDTO(user);
    }

    async updateUser(id, updateData) {
        const updatedUser = await this.userDAO.update(id, updateData);
        return updatedUser ? new UserDTO(updatedUser) : null;
    }

    async deleteUser(id) {
        return await this.userDAO.delete(id);
    }
}

export default UserRepository;
