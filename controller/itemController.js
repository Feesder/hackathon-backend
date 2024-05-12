import itemService from "../service/itemService.js";
import tenderService from "../service/tenderService.js";

class TenderController {
    async create(req, res) {
        try {
            const item = await itemService.create(req.body);
            res.json(item);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {

        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getById(req, res) {
        try {

        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getByTenderId(req, res) {
        try {
            const {tenderId} = req.params;
            if (!tenderId) {
                res.status(400).json({message: 'Id не указан'})
            }

            const items = await itemService.getByTenderId(tenderId);
            res.json(items);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {

        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {

        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new TenderController();