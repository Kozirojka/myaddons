from odoo import models, fields


class Action(models.Model):
    _name = "task.action"
    _description = "Task action"

    action_name = fields.Char(string="Action", required=True)
    action_description = fields.Char(string="Action Description", required=True)
