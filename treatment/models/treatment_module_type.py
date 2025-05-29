from odoo import models, fields

class TreatmentModuleType(models.Model):
    _name = 'treatment.module.type'
    _description = 'Treatment Module Type'
    _rec_name = 'name'

    name = fields.Char(string='Type Name', required=True)
    tooltip_text = fields.Text(string='Tooltip Text', help='Text to be shown in the tooltip')

    _sql_constraints = [
        ('unique_code', 'unique(name)', 'Type name must be unique!')
    ]