from odoo import models, fields

class TreatmentModule(models.Model):
    _name = 'treatment.module'
    _description = 'Treatment Module'
    _rec_name = 'name'

    name = fields.Char(string='Module Name', required=True)
    description = fields.Text(string='Description')

    start_date = fields.Date(string='Start Date')
    end_date = fields.Date(string='End Date')
    estimated_duration = fields.Float(string='Estimated Duration (Days)')
    
    results = fields.Json(string='Results')

    type_id = fields.Many2one('treatment.module.type', string='Type', required=True)

    treatment_plan_id = fields.Many2one('treatment.plan', string='Treatment Plan')
    survey_ids = fields.Many2many('survey.survey', string='Surveys')
    status_id = fields.Many2one('treatment.module.status', string='Status', required=True)

    # child_materials = fields.One2many('material.module', 'treatment_module_id', string='Child Materials')
    # parent_materials = fields.One2many('material.module', 'treatment_module_id', string='Parent Materials')
    parent_exercises = fields.Many2many('therapy.exercise.library', "treatment_module_exercise_parent_rel", "treatment_module_id", "therapy_exercise_library_id", string='child materials')    
    child_exercises = fields.Many2many('therapy.exercise.library', "treatment_module_exercise_child_rel", "treatment_module_id", "therapy_exercise_library_id", string='child materials')    

        