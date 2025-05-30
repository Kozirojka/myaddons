from odoo import models, fields

class ExerciseType(models.Model):
    _name = 'therapy.exercise.type'
    _description = 'Exercise Type'
    
    name = fields.Char(string='Name', required=True)
