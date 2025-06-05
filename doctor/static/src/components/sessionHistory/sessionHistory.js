import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { SessionHistoryPreview } from "./sessionHistoryPreview/sessionHistoryPreview";
import { SessionHistoryDetails } from "./sessuibHistoryDetails/sessionHistoryDetails";

export class SessionHistory extends Component {
    static template = "doctor.sessionHistory";    
    static components = { SessionHistoryPreview, SessionHistoryDetails }; 

    setup() {
        this.state = useState({
            isLoading: true,
            error: null,
            currentView: "preview", 
            selectedSession: null,
            sessionData: []
        });

        onWillStart(async () => {
            await this.loadSessionHistory();
        });
    }

    async loadSessionHistory() {
        try {
            this.state.isLoading = true;
            this.state.error = null;
            
            const patientId = this.getPatientIdFromUrl();
            if (!patientId) {
                throw new Error("Patient ID not found in URL");
            }

            const result = await rpc(`/doctor/patient/${patientId}/session/history`, {});

            if (result.error) {
                throw new Error(result.error);
            }

            this.state.sessionData = result.sessions || [];
        } catch (error) {
            console.error("Error loading session history:", error);
            this.state.error = error.message;
        } finally {
            this.state.isLoading = false;
        }
    }

    // Перемикання на детальний перегляд сесії
    showSessionDetails(session) {
        this.state.selectedSession = session;
        this.state.currentView = "details";
    }

    // Повернення до списку сесій
    backToPreview() {
        this.state.currentView = "preview";
        this.state.selectedSession = null;
    }

    get currentComponent() {
        return this.state.currentView === "preview" ? SessionHistoryPreview : SessionHistoryDetails;
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }
}

registry
    .category("public_components")
    .add("doctor.sessionHistory", SessionHistory);