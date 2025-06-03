import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class DoctorTabs extends Component {
    static template = "doctor.tabs";    
    
    // потрібно вирішити як можна взяти ID пацієнта без костилів
    setup() {
        this.state = useState({
            partner: null,
            isLoading: true,
            error: null,
        });
    }
    

    
}

registry
    .category("public_components")
    .add("doctor.tabs", DoctorTabs);
