import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class CurrentSession extends Component {
    static template = "doctor.currentSession";    
    
    setup() {
        this.state = useState({
            currentSession: null,
            treatmentModule: null,
            isLoading: true,
            error: null,
            isEditingObservation: false,
            observationText: '',
        });

        onWillStart(async () => {
            await this.loadSessionInformation();
        });
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }   

    async loadSessionInformation() {
        try {
            this.state.isLoading = true;
            this.state.error = null;
            
            const patientId = this.getPatientIdFromUrl();
            if (!patientId) {
                throw new Error("Patient ID not found in URL");
            }

            const sessionData = await rpc(`/doctor/patient/${patientId}/session`);
            console.log("Data", sessionData);
                
            this.state.currentSession = sessionData.session;
            this.state.treatmentModule = sessionData.treatment_module;
            this.state.observationText = sessionData.session?.session_notes || '';
            
        } catch (error) {
            console.error("Error loading session data:", error);
            this.state.error = "Failed to load session data. Please try again.";
        } finally {
            this.state.isLoading = false;
        }
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

    getStatusBadgeClass(status) {
        const statusClasses = {
            'Draft': 'bg-secondary',
            'In Progress': 'bg-primary',
            'Completed': 'bg-success',
            'Cancelled': 'bg-danger',
            
        };
        return statusClasses[status] || 'bg-secondary';
    }

    toggleOgetStatusBadgeClass(status) {
        const statusClasses = {
            'Scheduled': 'bg-info',
            'In Progress': 'bg-primary',
            'Completed': 'bg-success',
            'Cancelled': 'bg-danger',
            'No Show': 'bg-warning',
            'Rescheduled': 'bg-secondary',
        };
        return statusClasses[status] || 'bg-secondary';
    }
    
    toggleObservationEdit() {
        this.state.isEditingObservation = !this.state.isEditingObservation;
        if (this.state.isEditingObservation) {
            this.state.observationText = this.state.currentSession?.session_notes || '';
        }
    }

    cancelObservation() {
        this.state.isEditingObservation = false;
        this.state.observationText = this.state.currentSession?.session_notes || '';
    }

    async saveObservation() {
        try {
            const patientId = this.getPatientIdFromUrl();
            if (!patientId || !this.state.currentSession) return;

            await rpc('/doctor/patient/session/update_notes', {
                session_id: this.state.currentSession.id,
                notes: this.state.observationText
            });

            this.state.currentSession.session_notes = this.state.observationText;
            this.state.isEditingObservation = false;
            
        } catch (error) {
            console.error("Error saving observation:", error);
            alert("Failed to save observation. Please try again.");
        }
    }
}

registry
    .category("public_components")
    .add("doctor.currentSession", CurrentSession);