from odoo import models, fields

class Achievement(models.Model):
    _name = 'achievement'
    _description = 'Achievement'

    name = fields.Char(string='Name', required=True)
    icon = fields.Binary(string='Icon')  
    description = fields.Text(string='Description')
    xp_value = fields.Integer(string='XP Value')

    type_id = fields.Many2one(
        comodel_name='achievement.type',
        string='Type',
        required=True,
        ondelete='cascade'
    )
