import { Component, useState } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";

export class Overview extends Component {
    static template = "doctor.overview";

    setup() {
        console.log("Overview component initialized");
        
        this.state = useState({
            treatmentData: null,
            isLoading: false,
            error: null
        });
        
        this.loadTreatmentPlan();
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }

    async loadTreatmentPlan() {
        const patientId = this.getPatientIdFromUrl();
        if (!patientId) {
            this.state.error = "Patient ID not found in URL";
            return;
        }

        this.state.isLoading = true;
        this.state.error = null;

        console.log("Loading treatment plan for patient ID:", patientId);
    }

    formatDate(dateString) {
        if (!dateString) return "Not scheduled";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getProgressPercentage() {
        if (!this.state.treatmentData?.progress) return 0;
        const { completedSessions, totalSessions } = this.state.treatmentData.progress;
        return totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    }

    getProgressClass() {
        const percentage = this.getProgressPercentage();
        if (percentage >= 80) return 'bg-success';
        if (percentage >= 50) return 'bg-warning';
        return 'bg-info';
    }
}
