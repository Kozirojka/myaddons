import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Task } from "./task/task";
import { rpc } from "@web/core/network/rpc";

export class Tasks extends Component {
  static template = "doctor.Tasks";
  static components = { Task };

  setup() {

    this.state = useState({
      tasks: null,
      loading: false,
      error: null,
    });

    this.loadTasks();

    onWillStart(async () => {
      await this.loadTasks();
    });
  }

  getPatientIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
    return match ? parseInt(match[1]) : null;
  }

  async loadTasks() {

    try {
      console.log("Loading tasks...");

      const patientId = this.getPatientIdFromUrl();


      console.log(`Patient ID: ${patientId}`);


      const result = await rpc(`/doctor/patient/data/${patientId}/tasks`);

      console.log(result);

      this.state.tasks = result.exercise_cases;

      console.log("TASKS tasks successfully");

    } catch (error) {
      this.state.error = error.message;
    } finally {
      this.state.isLoading = false;
    }
  }

}

registry.category("public_components").add("doctor.Tasks", Tasks);
