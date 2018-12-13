"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
class ContactController {
    addNewAccount(req, res) {
        // console.log(req.body);
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContacts(req, res) {
        Contact.find({}, (err, contacts) => {
            if (err) {
                res.send(err);
            }
            res.json(contacts);
        });
    }
    getContactWithID(req, res) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteContact(req, res) {
        Contact.findByIdAndDelete(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ messsage: 'Contact deleted successfully' });
        });
    }
    updateContact(req, res) {
        Contact.findByIdAndUpdate(req.params.contactId, (err, contact) => {
            console.log(contact);
            if (err) {
                res.send(err);
            }
            res.json({ messsage: 'Contact deleted successfully' });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map