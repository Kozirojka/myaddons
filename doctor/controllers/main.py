from odoo import http
from odoo.http import request

class DoctorWebsite(http.Controller):
    @http.route(['/doctor/patient/<int:id>/treatment'], type='http', auth="public", website=True)
    def doctor_page(self, id, **kw):
        return request.render("doctor.doctor_page", {
            'patient_id': id,
        })

    @http.route('/patient/data/<int:id>', type='json', auth="public", website=True)
    def get_patient_data(self, id):

        partner = request.env['res.partner'].sudo().browse(id)        
        return {
            'partner': {
                'id' : partner.id,
                'name': partner.name,
                'email': partner.email,
                'phone': partner.phone,
                'address': partner.contact_address_complete,
            }
        }
    
    @http.route('/doctor/patient/data/<int:id>/tasks', type='json', auth="public", website=True)
    def get_test_data(self, id):

        patient = request.env['patient'].sudo().browse(1)
        if not patient:
                return {'error': 'Patient not found'}

        treatment_plans = request.env['treatment.plan'].sudo().search([('patient_id', '=', 1)])

        treatment_modules = request.env['treatment.module'].sudo().search([('treatment_plan_id', '=', 1)])

        exercise_cases = request.env['therapy.exercise.case'].sudo().search([('treatment_module_id', '=', 1)])

        return {
            'exercise_cases': [
                {'id': case.id, 'description': case.description}
                for case in exercise_cases
            ]
        }