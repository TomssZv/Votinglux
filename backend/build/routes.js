"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_controllers_1 = require("./controllers/session.controllers");
function routes(app) {
    app.post('/api/session', session_controllers_1.createSessionHandler);
}
exports.default = routes;
