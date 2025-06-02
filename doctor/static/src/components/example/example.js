import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
export class ExampleComponent extends Component {
  static template = "doctor.ExampleComponent";

  setup() {
    this.state = useState({ 
      clicked: false,
      patientId: this.getPatientIdFromUrl()
    });
  }

  getPatientIdFromUrl() {
    // Отримуємо ID з URL: /doctor/patient/123/treatment
    const path = window.location.pathname;
    const match = path.match(/\/doctor\/patient\/(\d+)\/treatment/);
    return match ? parseInt(match[1]) : null;
  }

  onClick() {
    this.state.clicked = true;
  }
}

registry.category("public_components").add(
  "doctor.ExampleComponent",
  ExampleComponent
);
