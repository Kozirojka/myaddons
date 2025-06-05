import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { SessionHistoryPeview } from "./sessionHistoryPreview/sessionHistoryPreview";
import { SessionHistoryDetails } from "./sessuibHistoryDetails/sessionHistoryDetails";

export class SessionHistory extends Component {
    static template = "doctor.sessionHistory";    
    static components = { SessionHistoryPeview, SessionHistoryDetails }; 


    setup() {
        this.state = useState({
            isLoading: false,
            error: null,
            child: "a"
        });

    }

    get myComponent() {
        return this.state.child === "a" ? SessionHistoryPeview : SessionHistoryDetails;
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