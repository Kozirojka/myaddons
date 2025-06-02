from odoo import models, fields


class TaskStatus(models.Model):
    _name = "task.status"
    _description = "Task Status"

    status_name = fields.char(string="Status", required=True)
    status_desription = fields.char(string="Status Description", required=True)
