import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { Task} from "./task/task";
import tasksData from "./tasks_data";

export class Tasks extends Component {
    static template = "doctor.tasks";    
    static components = { Task };

    setup() {
        console.log(tasksData);
        this.state = useState({
            
            tasks : tasksData,
            isLoading: false,
            error: null,
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
    .add("doctor.tasks", Tasks);
