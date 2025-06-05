import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { Tasks } from "./tasks/tasks";
import { CurrentSession } from "./currentSession/currentSession";
import { SessionHistory } from "../sessionHistory/sessionHistory";
import { Overview } from "./treatmentPlan/overview/overview";

export class DoctorTabs extends Component {
    static template = "doctor.tabs";    
    static components = { Tasks, CurrentSession, SessionHistory, Overview }; 
    setup() {

        console.log("DoctorTabs component initialized");


        this.state = useState({
            activeHorizontalTab: 'treatment',  
            
            activeTreatmentTab: 'modules',  
            activeHistoryTab: 'medical',
            activeTreatmentPlanTab: 'overview',
            
            partner: null,
            isLoading: false,
            error: null,
        });

    }

    get tabsConfig() {
        return {
            horizontal: [
                {
                    id: 'treatment',
                    label: 'Treatment',
                },
                {
                    id: 'history',
                    label: 'Diagnostic',
                },
                {
                    id: 'treatmentPlan',
                    label: 'Treatment Plan',
                }
            ],
            vertical: {
                treatment: [
                    { id: 'modules', label: 'Current session' },
                    { id: 'sessions', label: 'Tasks' },
                    { id: 'materials', label: 'Session history' }
                ],
                history: [
                    { id: 'medical', label: 'Medical Records' },
                    { id: 'appointments', label: 'Appointments' },
                    { id: 'documents', label: 'Documents' },
                ],
                treatmentPlan: [
                    { id: 'overview', label: 'Overview' }
                ]
            }
        };
    }

    getPatientIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
        return match ? parseInt(match[1]) : null;
    }

     

    setActiveHorizontalTab(tabId) {
        this.state.activeHorizontalTab = tabId;
    }

    setActiveTreatmentTab(tabId) {
        this.state.activeTreatmentTab = tabId;
    }

    setActiveHistoryTab(tabId) {
        this.state.activeHistoryTab = tabId;
    }

    setActiveTreatmentPlanTab(tabId) {
        this.state.activeTreatmentPlanTab = tabId;
    }

    get activeVerticalTab() {
        if (this.state.activeHorizontalTab === 'treatment') {
            return this.state.activeTreatmentTab;
        } else if (this.state.activeHorizontalTab === 'history') {
            return this.state.activeHistoryTab;
        } else if (this.state.activeHorizontalTab === 'treatmentPlan') {
            return this.state.activeTreatmentPlanTab;
        }
        return null;
    }

    get currentVerticalTabs() {
        return this.tabsConfig.vertical[this.state.activeHorizontalTab];
    }
}

registry
    .category("public_components")
    .add("doctor.tabs", DoctorTabs);