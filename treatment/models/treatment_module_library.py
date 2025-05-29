from odoo import models, fields

class TreatmentModuleLibrary(models.Model):
    _name = 'treatment.module.library'
    _description = 'Treatment Module Library'
    _rec_name = 'name'

    name = fields.Char(string='Module Name', required=True)
    description = fields.Text(string='Description')
    estimated_duration = fields.Float(string='Estimated Duration (Days)')
    
    type_id = fields.Many2one('treatment.module.type', string='Type', required=True)

    survey_ids = fields.Many2many('survey.survey', string='Recommended Surveys')

    # materials = fields.Many2many('materials', string='Recommended Materials')


