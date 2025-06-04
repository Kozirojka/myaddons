from odoo import models, fields


class CalendarEventStatus(models.Model):
    _name = "calendar.event.status"
    _description = "Calendar Event Status"

    name = fields.Char(string="Name", required=True)
    description = fields.Text(string="Description")