from odoo import models, fields

class ExerciseCase(models.Model):
    _name = 'therapy.exercise.case'
    _description = 'Exercise Case'
    
    result_exercise = fields.Json(string='Result Exercise (JSON)')
    exercises_id = fields.Many2one('therapy.exercise.library', string='Exercise Library', required=True)
    exercises_type_id = fields.Many2one('therapy.exercise.type', string='Exercise Type')
    exercises_status_id = fields.Many2one('therapy.exercise.status', string='Exercise Status')
    treatment_module_id = fields.Many2one('treatment.module', string='Treatment Module')