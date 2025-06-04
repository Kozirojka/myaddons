from odoo import models, fields


class MaterialModule(models.Model):
    _name = 'material.module'
    _description = 'Material Module'

    comments = fields.Text(string='Comments')
    status_id = fields.Many2one('materials.status', string='Status')
    
    treatment_module_id = fields.Many2one(
        'treatment.module',
        string='treatment module',
        required=True,
        ondelete='cascade'
    )
