import Tender from "../model/Tender.js";
import fileService from "./fileService.js";

class TenderService {
    async create(tender, picture) {
        const fileName = fileService.saveFile(picture);
        const createdTender = await Tender.create({...tender, picture: fileName, userId: tender.userId});
        return createdTender;
    }

    async getAll() {
        const tenders = await Tender.find();
        return tenders;
    }

    async getById(id) {
        const tender = await Tender.findById(id);
        return tender;
    }

    async update(id, tender) {
        const updatedTender = await Tender.findByIdAndUpdate(id, tender, {new: true});
        return updatedTender;
    }

    async delete(id) {
        await Tender.findByIdAndDelete(id);
    }
}

export default new TenderService();