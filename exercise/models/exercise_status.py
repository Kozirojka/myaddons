from odoo import models, fields

class ExerciseStatus(models.Model):
    _name = 'therapy.exercise.status'
    _description = 'Exercise Status'
    
    name = fields.Char(string='Name', required=True)