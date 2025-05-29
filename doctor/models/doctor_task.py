from odoo import models, fields


class DoctorTask(models.Model):
    _name = "doctor.task"
    _description = "Doctor Task"

    summary = fields.Char(string="Summary", required=True)
    details = fields.Text(string="Details")

    doctor_id = fields.Many2one("doctor", string="Doctor", required=True)
    status_id = fields.Many2one(
        "task.status", string="Status", required=True, tracking=True
    )
    contact_id = fields.Many2one(
        "res.partner",  # таблиця контактів
        string="Contact",
        required=True,
        tracking=True,
    )
