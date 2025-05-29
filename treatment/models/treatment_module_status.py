from odoo import models, fields

class TreatmentModuleStatus(models.Model):
    _name = 'treatment.module.status'
    _description = 'Treatment Module Status'
    _rec_name = 'name'

    name = fields.Char(string='Status Name', required=True)
    tooltip_text = fields.Text(string='Tooltip Text', help='Text to be shown in the tooltip')

    _sql_constraints = [
        ('unique_code', 'unique(name)', 'Status name must be unique!')
    ]