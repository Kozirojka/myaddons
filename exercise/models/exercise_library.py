from odoo import models, fields

class ExerciseLibrary(models.Model):
    _name = 'therapy.exercise.library'
    _description = 'Exercise Library'

    description = fields.Text(string='Description')
    exercise_structure = fields.Json(string='Exercise Structure (JSON)')

    repeatablility = fields.Integer(string='Repeatability')

    module_ids = fields.Many2many(
        'treatment.module.library',
        'exercise_module_rel',
        'exercise_id',
        'module_id',
        string='Linked Modules'
    )