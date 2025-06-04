from odoo import models, fields

class Materials(models.Model):
    _name = 'materials'
    _description = 'Materials'

    link_id = fields.Char(string='Link ID', required=True)
    type = fields.Char(string='Type')

    material_modules = fields.One2many('material.module', 'material_id', string='Material Modules')
