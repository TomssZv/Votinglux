"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionHandler = void 0;
const index_1 = require("../db/index");
function createSessionHandler(req, res) {
    const { email, password } = req.body;
    const user = (0, index_1.getUser)(email);
    if (!user || user.password !== password) {
        return res.status(401).send("Invalid email or password");
    }
}
exports.createSessionHandler = createSessionHandler;
