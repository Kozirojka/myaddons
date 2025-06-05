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

        patient = request.env['patient'].sudo().browse(id)  

        return {
            'partner': {
                'id' : patient.partner_id.id,
                'name': patient.partner_id.name,
                'email': patient.partner_id.email,
                'phone': patient.partner_id.phone,
                'address': patient.partner_id.contact_address_complete,
            }
        }
    
    @http.route('/doctor/patient/data/<int:id>/tasks', type='json', auth="public", website=True)
    def get_test_data(self, id):
        patient = request.env['patient'].sudo().browse(id)
        if not patient:
            return {'error': 'Patient not found'}
        
        treatment_plans = request.env['treatment.plan'].sudo().search([('patient_id', '=', patient.id)])

        treatment_modules = request.env['treatment.module'].sudo().search(
            [('treatment_plan_id', '=', treatment_plans.id)], 
            order='start_date desc', 
            limit=1
        )
        
        exercise_cases = request.env['therapy.exercise.case'].sudo().search([
            ('treatment_module_id', '=', treatment_modules.id)
        ])
        
        exercise_data = []
        for case in exercise_cases:
            session_exercise = request.env['therapy.session.exercise'].sudo().search([
                ('exercise_case_id', '=', case.id)
            ], limit=1)
            
            if session_exercise:
                session = session_exercise.session_id
                session_info = {
                    'session_id': session.id,
                    'session_name': session.name,
                    'order_number': session_exercise.order_number,
                    'session_status': session.status_id.name if session.status_id else None,
                    'session_notes': session.notes,
                }
            else:
                session_info = None


            exercise_data.append({
                'id': case.id,
                'name': case.exercises_id.description,
                'status': case.exercises_status_id.name,
                'session': session_info,
                'result_exercise': case.result_exercise,
            })
        
        return {
            'exercise_cases': exercise_data
        }
    
    @http.route('/doctor/patient/<int:id>/session', type='json', auth="public", website=True)
    def get_current_session_data(self, id):
        
        patient = request.env['patient'].sudo().browse(id)

        # 14-15 
        # статус сессии
        # Observation

        # потрібно витягнути останнє виокнанен завдання пацієнта
            # воно має статус, фото
        treatment_plans = request.env['treatment.plan'].sudo().search([('patient_id', '=', patient.id)])


        treatment_modules = request.env['treatment.module'].sudo().search(
            [('treatment_plan_id', '=', treatment_plans.id)], 
            order='start_date desc', 
            limit=1
        )


        session = request.env['therapy.session'].sudo().search(
            [('treatment_module_id', '=', treatment_modules.id)],
            order='create_date desc',
            limit=1
        )

        return {
            'session': {
                'id': session.id,
                'session_name': session.name if session.name else False,
                'session_status': session.status_id.name if session.status_id else 'Draft',
                'session_notes': session.notes or '',
                'calendar_id': session.calendar_id.id if session.calendar_id else False,
                'calendar_appointment_start': session.calendar_id.start if session.calendar_id else False,
                'calendar_appointment_end': session.calendar_id.stop if session.calendar_id else False,
                'appointmnet_status': session.calendar_id.status_id.name if session.calendar_id and session.calendar_id.status_id else 'Draft',
            },
            'treatment_module': {
                'id': treatment_modules.id,
                'name': treatment_modules.name,
            }
        }

    @http.route('/doctor/patient/session/update_notes', type='json', auth="public", website=True)
    def update_session_notes(self, session_id, notes):
        try:
            session = request.env['therapy.session'].sudo().browse(session_id)
            if not session.exists():
                return {'error': 'Session not found'}
            
            session.write({'notes': notes})
            return {'success': True}
            
        except Exception as e:
            return {'error': str(e)}
        
    