from odoo import models, fields


class PatientRequestStatus(models.Model):
    _name = "patient.request.status"
    _description = "Patient Request Status"

    status_name = fields.Char(string="Status", required=True)
    status_desription = fields.Char(string="Status Description", required=True)
