from odoo import models, fields

class Patient(models.Model):
    _name = 'patient'
    _description = 'This is start page of patient'
    
    partner_id = fields.Many2one(
        'res.partner',
        string='Related Partner',
        required=True,
        ondelete='cascade',
        index=True
    )
    
    guardian_id = fields.Many2one(
        'guardian',
        string='Guardian',
        ondelete='set null',
    )

    achievement_ids = fields.Many2many(
        'achievement',
        'patient_achievement_rel',
        'patient_id',
        'achievement_id',
        string='Achievements'
    )

    casemanager_id = fields.Many2one(
        'case.manager',
        string='Case Manager',
        ondelete='set null',
        index=True,
    )

    _sql_constraints = [
        ('unique_partner', 'UNIQUE(partner_id)', 'This partner is already linked to another patient!'),
        ('unique_partner', 'UNIQUE(casemanager_id)', 'This casemanger is already linked to you patient fuck!')
    ]

    
