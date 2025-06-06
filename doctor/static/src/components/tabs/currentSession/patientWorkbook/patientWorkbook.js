import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class PatientWorkbook extends Component {
    static template = "doctor.patientWorkbook";    
    
    static props = {
        sessionData: { type: Object, optional: true },
        treatmentModule: { type: Object, optional: true },
        exercise: { type: Object, optional: true },
        attached_materials: { type: Array, optional: true }
    };
    
    setup() {
        this.state = useState({
            isLoading: false,
            error: null,
        });
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }   
}

registry
    .category("public_components")
    .add("doctor.patientWorkbook", PatientWorkbook);