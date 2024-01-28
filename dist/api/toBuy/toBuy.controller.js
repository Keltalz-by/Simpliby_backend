"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBuyController = void 0;
const toBuy_service_1 = require("./toBuy.service");
class ToBuyController {
    constructor() {
        this.toBuyService = new toBuy_service_1.ToBuyService();
        this.createToBuy = async (req, res, next) => {
            try {
                const data = req.body;
                const userId = res.locals.user._id;
                const toBuy = await this.toBuyService.createToBuy(data.map((item) => {
                    return { title: item.title, userId };
                }));
                return res.status(201).json({ success: true, data: toBuy });
            }
            catch (err) {
                next(err);
            }
        };
        this.completeToBuy = async (req, res, next) => {
            try {
                const { id } = req.params;
                const userId = res.locals.user._id;
                const toBuy = await this.toBuyService.completeToBuy(id, userId);
                return res.status(200).json({ success: true, data: toBuy });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteToBuy = async (req, res, next) => {
            try {
                const { id } = req.params;
                const userId = res.locals.user._id;
                await this.toBuyService.deleteToBuy(id, userId);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ToBuyController = ToBuyController;
//# sourceMappingURL=toBuy.controller.js.map