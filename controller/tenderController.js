import TenderService from "../service/tenderService.js";
import tenderService from "../service/tenderService.js";
import fileService from "../service/fileService.js";
import FileService from "../service/fileService.js";
import express from "express";

class TenderController {
    async create(req, res) {
        try {
            const tender = await TenderService.create(req.body, req.files.picture);
            res.json(tender);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const tenders = await TenderService.getAll();
            res.json(tenders);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }

            const tender = await tenderService.getById(id);
            res.json(tender);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }

            const tender = req.body;
            console.log(tender)
            const updatedTender = await tenderService.update(id, tender);
            res.json(updatedTender);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }

            await tenderService.delete(id);
            res.json({message: 'Успешно'});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new TenderController();