from odoo import models, fields


class DoctorSpecialization(models.Model):
    _name = "doctor.specialization"
    _description = "Medical Specialization"

    speacialization_name = fields.Char("Specialization Name", required=True)
    speacialization_description = fields.Text(string="Description")

    doctor_ids = fields.One2many("doctor", "specialization_id", string="Doctors")
