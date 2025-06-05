from odoo import models, fields

class CalendarEvent(models.Model):
    _inherit = 'calendar.event'

    attendees = fields.Char(string="Attendees")
    status_id = fields.Many2one("calendar.event.status", required=True)