from odoo import models, fields, api

class Session(models.Model):
    _name = 'therapy.session'
    _description = 'Session'

    calendar_id = fields.Many2one('calendar.event', string='Calendar ID')
    notes = fields.Text(string='Notes')
    treatment_module_id = fields.Many2one('treatment_module', string='treatment module')
    status_id = fields.Many2one('therapy.session.status', string='Status')
    #plan = fields.Text(string='Plan')

    name = fields.Char(string='Session Name', compute='_compute_name', store=True)
    @api.depends('calendar_id', 'create_date')
    def _compute_name(self):
        for record in self:
            if record.calendar_id:
                record.name = f"Session - {record.calendar_id.name}"
            else:
                record.name = f"Session - {record.create_date.strftime('%Y-%m-%d %H:%M') if record.create_date else 'New'}"
    
    @api.model
    def create(self, vals):
        if not vals.get('status_id'):
            default_status = self.env['therapy.session.status'].search([('name', '=', 'Draft')], limit=1)
            if not default_status:
                default_status = self.env['therapy.session.status'].create({'name': 'Draft'})
            vals['status_id'] = default_status.id
        return super().create(vals)