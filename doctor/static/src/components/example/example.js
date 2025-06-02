import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
export class ExampleComponent extends Component {
  static template = "doctor.ExampleComponent";

  setup() {
    this.state = useState({ clicked: false });
  }

  onClick() {
    this.state.clicked = true;
  }
}

registry.category("public_components").add(
  "doctor.ExampleComponent",
  ExampleComponent
);
