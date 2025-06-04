from odoo import models, fields, api

class TreatmentPlan(models.Model):
    _name = 'treatment.plan'
    _description = 'Treatment Plan'
    _rec_name = 'name'


    name = fields.Char(string='Name', required=True, index=True)
    description = fields.Text(string='Description')
    post_material_links = fields.Text(string='Post-treatment Material Links')
    module_progress = fields.Float(string="Progress (%)", compute='_compute_progress', store=True)

    patient_id = fields.Many2one('patient', string='Patient', required=True, index=True)
    module_ids = fields.One2many('treatment.module', 'treatment_plan_id', string='Modules')
    

    # patient_id = fields.Many2one('patient', string='Patient', required=True, index=True)

    
    @api.depends('module_ids.status_id.name')
    def _compute_progress(self):
        for plan in self:
            modules_with_status = plan.module_ids.filtered(lambda m: m.status_id)
            total = len(modules_with_status)
            if total == 0:
                plan.module_progress = 0.0
                continue

            done = len(modules_with_status.filtered(lambda m: m.status_id.name == 'Completed'))
            plan.module_progress = (done / total) * 100.0

