from odoo import models, fields

class SessionExercise(models.Model):
    _name = 'therapy.session.exercise'
    _description = 'Session Exercise'
    
    order_number = fields.Integer(string='Order Number')
    exercise_case_id = fields.Many2one('therapy.exercise.case', string='Exercise Case', required=True)
    session_id = fields.Many2one('therapy.session', string='Session', required=True)