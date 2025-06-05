import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { Tasks } from "./tasks/tasks";
import { CurrentSession } from "./currentSession/currentSession";
export class DoctorTabs extends Component {
    static template = "doctor.tabs";    
    static components = { Tasks, CurrentSession }; 
    setup() {

        console.log("DoctorTabs component initialized");


        this.state = useState({
            activeHorizontalTab: 'treatment',  
            
            activeTreatmentTab: 'modules',  
            activeHistoryTab: 'medical', 
            
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
                    icon: 'fas fa-stethoscope'
                },
                {
                    id: 'history',
                    label: 'Diagnostic',
                    icon: 'fas fa-history'
                }
            ],
            vertical: {
                treatment: [
                    { id: 'modules', label: 'Current session', icon: 'fas fa-puzzle-piece' },
                    { id: 'sessions', label: 'Tasks', icon: 'fas fa-calendar-check' },
                    { id: 'materials', label: 'Session history', icon: 'fas fa-book' }
                ],
                history: [
                    { id: 'medical', label: 'Medical Records', icon: 'fas fa-file-medical' },
                    { id: 'appointments', label: 'Appointments', icon: 'fas fa-calendar-alt' },
                    { id: 'documents', label: 'Documents', icon: 'fas fa-folder-open' }
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

    get activeVerticalTab() {
        return this.state.activeHorizontalTab === 'treatment' 
            ? this.state.activeTreatmentTab 
            : this.state.activeHistoryTab;
    }

    get currentVerticalTabs() {
        return this.tabsConfig.vertical[this.state.activeHorizontalTab];
    }
}

registry
    .category("public_components")
    .add("doctor.tabs", DoctorTabs);