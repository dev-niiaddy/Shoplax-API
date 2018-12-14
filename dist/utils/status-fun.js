"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = (res, message) => {
    res.status(200).send(message);
};
exports.badRequest = (res, message) => {
    res.status(400).send(message);
};
exports.created = (res, message) => {
    res.status(201).send(message);
};
exports.notFound = (res, message) => {
    res.status(404).send(message);
};
exports.unAuthorized = (res, message) => {
    res.status(401).send(message);
};
//# sourceMappingURL=status-fun.js.map