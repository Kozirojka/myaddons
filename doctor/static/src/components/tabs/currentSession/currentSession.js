import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";


export class CurrentSession extends Component {


    static template = "doctor.currentSession";    
    
    setup() {
        this.state = useState({
            currentSession: null,
            isLoading: true,
            error: null,
        });

        onWillStart(async () => {
            this.loadSessionInformation();
        });

    }

    async loadSessionInformation() {


    }
}

registry
    .category("public_components")
    .add("doctor.currentSession", CurrentSession);
