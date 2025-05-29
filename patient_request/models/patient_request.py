from odoo import models, fields


class PatientRequest(models.Model):
    _name = "patient.request"
    _description = "Patient Request"

    patient_name = fields.Char(string="Patient Full Name", required=True)
    patient_birthdate = fields.Date(string="Date of Birth", required=True)

    guardian_name = fields.Char(string="Guardian/Patient Full Name", required=True)
    guardian_email = fields.Char(string="Email", required=True)
    guardian_phone = fields.Char(string="Phone Number", required=True)

    request_description = fields.Text(string="Description", require=True)

    status_id = fields.Many2one(
        "task.status", string="Status", required=True, tracking=True
    )
    case_manager_id = fields.Many2one("case.manager", string="Resolved by")
