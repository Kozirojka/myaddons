from odoo import models, fields

class AchievementType(models.Model):
    _name = 'achievement.type'
    _description = 'Achievement Type'

    name = fields.Char(string='Name', required=True)
