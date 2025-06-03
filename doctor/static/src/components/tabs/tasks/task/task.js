import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class Task extends Component {
    static template = "doctor.task";    

    static props = {
        task: Object
    };

}

registry
    .category("public_components")
    .add("doctor.task", Task);
