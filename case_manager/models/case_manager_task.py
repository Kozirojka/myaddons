from odoo import models, fields


class CaseManagerTask(models.Model):
    _name = "case.manager.task"
    _description = "Case Manager Task"

    details = fields.Text(string="Details")

    patient_id = fields.Many2one(
        "patient", string="Patient", required=True, tracking=True
    )
    action_id = fields.Many2one(
        "task.action", string="Action", required=True, tracking=True
    )
    status_id = fields.Many2one(
        "task.status", string="Status", required=True, tracking=True
    )
    reporter_id = fields.Many2one(
        "res.partner", string="Reporter", required=True, tracking=True
    )
    case_manager_id = fields.Many2one(
        "case.manager", string="Case Manager", required=True
    )
