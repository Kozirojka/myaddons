import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class PatientSnapshot extends Component {
    static template = "doctor.patientSnapshot";    
    
    // потрібно вирішити як можна взяти ID пацієнта без костилів
    setup() {
        this.state = useState({
            partner: null,
            isLoading: true,
            error: null,
        });

        this.loadPartners();
    }

    getPatientIdFromUrl() {
        // Отримуємо ID з URL: /doctor/patient/123/treatment
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }   

    async loadPartners() {
        try {
            console.log("Loading partners...");
            
            const patientId = this.getPatientIdFromUrl();
            if (!patientId) {
                throw new Error('Patient ID not found in URL');
            }

            const result = await rpc(`/patient/data/${patientId}`);

            console.log(result);
            console.log("Partners loaded successfully");

            this.state.partner = result.partner;

        } catch (error) {
            this.state.error = error.message;
        } finally {
            this.state.isLoading = false;
        }

    }
}

registry
    .category("public_components")
    .add("doctor.patientSnapshot", PatientSnapshot);
