from odoo import models, fields

class CalendarEvent(models.Model):
    _inherit = "calendar.event"

    # Additional fields from diagram
    # session_id = fields.Many2one('therapy.session', string='Session ID')
    attendees = fields.Char(string="Attendees")
    status_id = fields.Many2one("calendar.event.status", required=True)