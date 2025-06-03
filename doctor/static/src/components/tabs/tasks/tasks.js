import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Task } from "./task/task";
import tasksData from "./tasks_data";

export class Tasks extends Component {
  static template = "doctor.Tasks";
  static components = { Task };

  setup() {
    console.log(tasksData);

    console.log("h ello from Tasks component");
    this.state = useState({
      tasks: tasksData,
      loading: false,
      error: null,
    });
  }
  
}

registry.category("public_components").add("doctor.Tasks", Tasks);
