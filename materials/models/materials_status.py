from odoo import models, fields

class MaterialsStatus(models.Model):
    _name = 'materials.status'
    _description = 'Materials Status'

    name = fields.Char(
        string='Name',
        required=True,
        help='Status name'
    )