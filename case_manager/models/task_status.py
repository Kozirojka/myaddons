from odoo import models, fields


class TaskStatus(models.Model):
    _name = "task.status"
    _description = "Task Status"

    status_name = fields.Char(string="Status", required=True)
    status_description = fields.Char(string="Status Description", required=True)

