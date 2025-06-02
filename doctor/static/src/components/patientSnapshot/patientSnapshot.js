import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class PatientSnapshot extends Component {
    static template = "doctor.PatientSnapshot";

    setup() {
        this.state = useState({
            partner: null,
            isLoading: true,
            error: null,
            filter: "",
            view: "kanban",
        });

        this.loadPartners();
    }

    async loadPartners() {

        try {

            console.log("Loading partners...");

            const result = await rpc('/patient/data/33');

            console.log(result);

            console.log("Partners loaded successfully");


            this.state.partners = result.partner;

        } catch (error) {
            this.state.error = error.message;
        } finally {
            this.state.isLoading = false;
        }

    }
    onClick() {
        this.state.clicked = true;
    }
}

registry
    .category("public_components")
    .add("doctor.PatientSnapshot", PatientSnapshot);
