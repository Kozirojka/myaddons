from odoo import models, fields

class SessionStatus(models.Model):
    _name = 'therapy.session.status'
    _description = 'Session Status'
    
    name = fields.Char(string='Name', required=True)
    