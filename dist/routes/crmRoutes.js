"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET Request sucessfull.'
            });
        });
        //Contacts
        app.route('/contact')
            //GET endpoint
            .get(this.contactController.getContacts)
            //POST endpoint
            .post(this.contactController.addNewAccount);
        //Contact detail
        app.route('/contact/:contactId')
            //get specific contact
            .get(this.contactController.getContactWithID)
            //update contact
            .put(this.contactController.updateContact)
            //delete contact
            .delete(this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map