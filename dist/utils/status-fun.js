"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = (res, message) => {
    res.status(200).json(message);
};
exports.badRequest = (res, message) => {
    res.status(400).json(message);
};
exports.created = (res, message) => {
    res.status(201).json(message);
};
exports.notFound = (res, message) => {
    res.status(404).json(message);
};
exports.unAuthorized = (res, message) => {
    res.status(401).json(message);
};
exports.internalError = (res, message) => {
    res.status(500).json(message);
};
//# sourceMappingURL=status-fun.js.map