from odoo import models, fields


class DoctorSpecialization(models.Model):
    _name = "doctor.specialization"
    _description = "Medical Specialization"

    specialization_name = fields.Char("Specialization Name", required=True)
    specialization_description = fields.Text(string="Description")

