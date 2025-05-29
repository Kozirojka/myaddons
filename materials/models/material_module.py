from odoo import models, fields


class MaterialModule(models.Model):
    _name = 'material.module'
    _description = 'Material Module'

    comments = fields.Text(string='Comments')
    status_id = fields.Many2one('materials.status', string='Status')
    
    material_id = fields.Many2one(
        'materials',
        string='Material',
        required=True,
        ondelete='cascade'
    )

    treatment_module_id = fields.Many2one(
        'treatment.module',
        string='Treatment Plan',
        required=True,
        ondelete='cascade'
    )