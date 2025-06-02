from odoo import models, fields


class Doctor(models.Model):
    _name = "doctor"
    _description = "Doctor"

    max_assigned_patients = fields.Integer(string="Max Patients", default=10)

    employee_id = fields.Many2one(
        "hr.employee", string="Employee", required=True, ondelete="cascade"
    )
    specialization_id = fields.Many2one(
        "doctor.specialization", string="Specialization", required=True
    )
    patient_ids = fields.Many2many(
        "res.partner",  # модель пацієнта
        "doctor_patient_rel",
        "doctor_id",
        "patient_id",
        string="Patients",
    )
    task_ids = fields.One2many("doctor.task", "doctor_id", string="Doctor Tasks")

    _sql_constraints = [
        (
            "employee_unique",
            "unique(employee_id)",
            "Each doctor can have only one employee account.",
        ),
    ]
