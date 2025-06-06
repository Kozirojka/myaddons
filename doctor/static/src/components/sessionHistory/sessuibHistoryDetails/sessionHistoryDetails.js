import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SessionHistoryDetails extends Component {
    static template = "doctor.sessionHistoryDetails";
    
    static props = {
        session: Object,
        onBack: Function,
    };

    formatDateTime(dateString) {
        if (!dateString) return "Not scheduled";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long', 
            year: 'numeric'
        }) + ' at ' + date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getSessionStatusClass(status) {
        const statusClasses = {
            'Completed': 'bg-success',
            'Cancelled': 'bg-danger',
            'In Progress': 'bg-primary',
            'Scheduled': 'bg-info',
            'Draft': 'bg-secondary'
        };
        return statusClasses[status] || 'bg-secondary';
    }

    getAppointmentStatusClass(status) {
        const statusClasses = {
            'Completed': 'text-success',
            'Cancelled': 'text-danger', 
            'In Progress': 'text-primary',
            'Scheduled': 'text-info',
            'Draft': 'text-muted'
        };
        return statusClasses[status] || 'text-muted';
    }

    onBackClick() {
        this.props.onBack();
    }

    calculateDuration() {
        const { calendar_appointment_start, calendar_appointment_end } = this.props.session;
        if (!calendar_appointment_start || !calendar_appointment_end) {
            return "Duration not available";
        }
        
        const start = new Date(calendar_appointment_start);
        const end = new Date(calendar_appointment_end);
        const diffMs = end - start;
        const diffMins = Math.round(diffMs / 60000);
        
        if (diffMins < 60) {
            return `${diffMins} minutes`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const minutes = diffMins % 60;
            return `${hours}h ${minutes}m`;
        }
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