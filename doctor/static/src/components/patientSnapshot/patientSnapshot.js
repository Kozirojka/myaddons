import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
export class PatientSnapshot extends Component {
  static template = "doctor.PatientSnapshot";

  setup() {
    this.state = useState({ clicked: false });
  }

  onClick() {
    this.state.clicked = true;
  }
}

registry.category("public_components").add(
  "doctor.PatientSnapshot",
  PatientSnapshot
);
