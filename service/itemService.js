import Item from "../model/Item.js";

class ItemService {
    async create(item) {
        console.log(item)
        const itemCreated = await Item.create(item);
        return itemCreated;
    }

    async getAll() {

    }

    async getById(id) {

    }

    async getByTenderId(tenderId) {
        const items = await Item.find({tenderId})
        return items
    }

    async update(id, tender) {

    }

    async delete(id) {

    }
}

export default new ItemService();