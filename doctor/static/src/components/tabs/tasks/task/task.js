import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class Task extends Component {
  static template = "doctor.Task";

  static props = {
    task: Object,
  };

}

registry.category("public_components").add("doctor.Task", Task);
