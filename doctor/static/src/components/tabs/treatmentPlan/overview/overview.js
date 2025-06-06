import { Component, useState, onWillStart } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";

export class Overview extends Component {
    static template = "doctor.overview";

    setup() {
        console.log("Overview component initialized");
          this.state = useState({
            treatmentData: null,
            treatment_plans: [],
            isLoading: false,
            error: null
        });
        
        onWillStart(async () => {
            await this.loadTreatmentPlan();
        });
        
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }    async loadTreatmentPlan() {
        const patientId = this.getPatientIdFromUrl();
        if (!patientId) {
            this.state.error = "Patient ID not found in URL";
            return;
        }

        this.state.isLoading = true;
        this.state.error = null;

        try {
            const treatmentData = await rpc(`/doctor/patient/${patientId}/treatmetn-plan`);
            
            this.state.treatmentData = treatmentData;
            this.state.treatment_plans = treatmentData.treatment_plans || [];

            console.log("Loading treatment plan", treatmentData);
        } catch (error) {
            console.error("Error loading treatment plan:", error);
            this.state.error = "Failed to load treatment plan data.";
        } finally {
            this.state.isLoading = false;
        }
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
