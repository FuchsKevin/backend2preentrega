import UserModel from '../../models/User.model.js';

class UserDAO {
    async getById(id) {
        return await UserModel.findById(id).lean();
    }

    async getByEmail(email) {
        return await UserModel.findOne({ email }).lean();
    }

    async create(userData) {
        return await UserModel.create(userData);
    }

    async update(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

export default new UserDAO();
