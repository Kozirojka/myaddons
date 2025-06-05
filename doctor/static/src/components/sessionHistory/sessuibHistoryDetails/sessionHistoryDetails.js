import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";


export class SessionHistoryDetails extends Component {
    static template = "doctor.SessionHistoryDetails";    
    static components = { }; 


    setup() {
        this.state = useState({
            sessionHistoryDetails: null,
            isLoading: false,
            error: null,
        });

        onWillStart(async () => {
            await this.loadSessionHistoryDetails();
        });
    }

    async loadSessionHistoryDetails() {

        // var patientId = this.getPatientIdFromUrl();

        // var sessions = await rpc(`/doctor/patient/${patientId}/session/history`);

        // console.log("Session History Data", sessions);
        
        // this.state.sessionHistory = sessions.session_data;
        
    }
    
    formatTime(dateTime) {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return date.toLocaleTimeString('uk-UA', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
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
    .add("doctor.sessionHistoryDetails", SessionHistoryDetails);