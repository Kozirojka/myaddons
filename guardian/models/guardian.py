from odoo import models, fields

class Guardian(models.Model):
    _name = 'guardian'
    _description = 'This is start page of guardian'
    
    partner_id = fields.Many2one(
        'res.partner',
        string='Related Partner',
        required=True,
        ondelete='cascade',
        index=True
    )
    
    

    _sql_constraints = [
        ('unique_partner', 'UNIQUE(partner_id)', 'This partner is already linked to another guardian!')
    ]
