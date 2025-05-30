from odoo import models, fields

class Session(models.Model):
    _name = 'therapy.session'
    _description = 'Session'

    calendar_id = fields.Many2one('calendar.event', string='Calendar ID')
    notes = fields.Text(string='Notes')
    plan = fields.Text(string='Plan')
    status_id = fields.Many2one('therapy.session.status', string='Status')