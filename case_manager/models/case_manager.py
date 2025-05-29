from odoo import models, fields


class CaseManager(models.Model):
    _name = "case.manager"
    _description = "Case Manager"

    employee_id = fields.Many2one(
        "hr.employee", string="Employee", required=True, ondelete="cascade"
    )
    # task_ids = fields.One2many(
    #     "case.manager.task", "case_manager_id", string="Case Manager Tasks"
    # )

    # In Treatment Progress
    # patient_ids = fields.One2many(
    #     "patient",  # модель пацієнта
    #     "case_manager_id",
    #     string="Resolved by",
    # )

    _sql_constraints = [
        (
            "employee_unique",
            "unique(employee_id)",
            "Each case manager can have only one employee account.",
        ),
    ]
