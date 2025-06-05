from odoo import http
from odoo.http import request
import json
import logging

_logger = logging.getLogger(__name__)


class SessionController(http.Controller):

    @http.route('/session/test', type='http', auth='user', website=True)
    def test_route(self, **kwargs):
        # add cute tick emoji
        return '✅ Test route is working!'

    def _get_session_data(self, session_id):
        try:
            session = request.env['therapy.session'].browse(session_id)
            if not session.exists():
                return None

            exercises = request.env['therapy.session.exercise'].search([
                ('session_id', '=', session_id)
            ], order='order_number')

            exercises_case = request.env['therapy.exercise.case'].search([
                ('id', 'in', exercises.mapped('exercise_case_id').ids)
            ])

            exercise_data = []
            for exercise in exercises:
                exercise_data.append({
                    'id': exercise.id,
                    'order_number': exercise.order_number,
                    'exercise_case_id': exercise.exercise_case_id.id,
                    'exercise_name': exercise.exercise_case_id.name,
                })

            return {
                'session': {
                    'id': session.id,
                    'name': session.name,
                    'notes': session.notes or '',
                    'status_id': session.status_id.id if session.status_id else None,
                    'status_name': session.status_id.name if session.status_id else '',
                    'calendar_id': session.calendar_id.id if session.calendar_id else None,
                    'calendar_name': session.calendar_id.name if session.calendar_id else '',
                    'create_date': session.create_date.isoformat() if session.create_date else None,
                },
                'exercises': exercise_data
            }
        except Exception as e:
            _logger.error(f"Error getting session data: {str(e)}")
            return None

    @http.route('/session/<int:session_id>', type='http', auth='user', website=True)
    def session_page(self, session_id, **kwargs):
        session = request.env['therapy.session'].browse(session_id)
        if not session.exists():
            return request.not_found()

        return request.render('session.session_page', {
            'session_id': session_id,
            'session_name': session.name,
        })

    # Новий API endpoint для отримання даних сесії
    @http.route('/api/session/<int:session_id>/data', type='http', auth='user', methods=['GET'])
    def get_session_data(self, session_id, **kwargs):
        try:
            session_data = self._get_session_data(session_id)
            if not session_data:
                return request.make_response(
                    json.dumps({'error': 'Session not found', 'status': 404}),
                    [('Content-Type', 'application/json')],
                    status=404
                )
            return request.make_response(
                json.dumps({'status': 'success', 'data': session_data}),
                [('Content-Type', 'application/json')]
            )
        except Exception as e:
            _logger.error(f"Error getting session data via API: {str(e)}")
            return request.make_response(
                json.dumps({'error': str(e), 'status': 500}),
                [('Content-Type', 'application/json')],
                status=500
            )

    @http.route('/api/session/<int:session_id>/update', type='json', auth='user', methods=['POST'])
    def update_session(self, session_id, **kwargs):
        """Оновити дані сесії"""
        try:
            session = request.env['therapy.session'].browse(session_id)
            if not session.exists():
                return {'error': 'Session not found', 'status': 404}

            data = request.jsonrequest
            update_vals = {}

            if 'notes' in data:
                update_vals['notes'] = data['notes']

            if 'status_id' in data:
                status = request.env['therapy.session.status'].browse(data['status_id'])
                if status.exists():
                    update_vals['status_id'] = data['status_id']

            if update_vals:
                session.write(update_vals)
                return {'status': 'success', 'message': 'Session updated successfully'}
            else:
                return {'error': 'No valid data to update', 'status': 400}

        except Exception as e:
            _logger.error(f"Error updating session: {str(e)}")
            return {'error': str(e), 'status': 500}

    @http.route('/api/session/statuses', type='http', auth='user', methods=['GET'])
    def get_session_statuses(self, **kwargs):
        try:
            statuses = request.env['therapy.session.status'].search([])
            status_data = []
            for status in statuses:
                status_data.append({
                    'id': status.id,
                    'name': status.name
                })
            return request.make_response(
                json.dumps({'status': 'success', 'data': status_data}),
                [('Content-Type', 'application/json')]
            )
        except Exception as e:
            _logger.error(f"Error getting statuses: {str(e)}")
            return request.make_response(
                json.dumps({'error': str(e), 'status': 500}),
                [('Content-Type', 'application/json')],
                status=500
            )

    @http.route('/api/exercises/available', type='http', auth='user', methods=['GET'])
    def get_available_exercises(self, **kwargs):
        try:
            exercises = request.env['therapy.exercise.case'].search([])
            exercise_data = [{'id': ex.id, 'name': ex.name} for ex in exercises]
            return request.make_response(
                json.dumps({'status': 'success', 'data': exercise_data}),
                [('Content-Type', 'application/json')]
            )
        except Exception as e:
            _logger.error(f"Error getting available exercises: {str(e)}")
            return request.make_response(
                json.dumps({'error': str(e), 'status': 500}),
                [('Content-Type', 'application/json')],
                status=500
            )

    @http.route('/api/session/<int:session_id>/exercises/add', type='json', auth='user', methods=['POST'])
    def add_exercise_to_session(self, session_id, **kwargs):
        """Додати вправу до сесії"""
        try:
            session = request.env['therapy.session'].browse(session_id)
            if not session.exists():
                return {'error': 'Session not found', 'status': 404}

            data = request.jsonrequest
            exercise_case_id = data.get('exercise_case_id')

            if not exercise_case_id:
                return {'error': 'exercise_case_id is required', 'status': 400}

            # Перевіряємо, чи існує exercise case
            exercise_case = request.env['therapy.exercise.case'].browse(exercise_case_id)
            if not exercise_case.exists():
                return {'error': 'Exercise case not found', 'status': 404}

            # Знаходимо максимальний порядковий номер
            max_order = request.env['therapy.session.exercise'].search([
                ('session_id', '=', session_id)
            ], order='order_number desc', limit=1)

            next_order = (max_order.order_number or 0) + 1

            # Створюємо новий запис
            new_exercise = request.env['therapy.session.exercise'].create({
                'session_id': session_id,
                'exercise_case_id': exercise_case_id,
                'order_number': next_order
            })

            return {
                'status': 'success',
                'message': 'Exercise added successfully',
                'data': {
                    'id': new_exercise.id,
                    'order_number': new_exercise.order_number,
                    'exercise_case_id': new_exercise.exercise_case_id.id,
                    'exercise_name': new_exercise.exercise_case_id.name
                }
            }

        except Exception as e:
            _logger.error(f"Error adding exercise to session: {str(e)}")
            return {'error': str(e), 'status': 500}

    @http.route('/api/session/exercises/<int:exercise_id>/remove', type='json', auth='user', methods=['POST'])
    def remove_exercise_from_session(self, exercise_id, **kwargs):
        """Видалити вправу з сесії"""
        try:
            exercise = request.env['therapy.session.exercise'].browse(exercise_id)
            if not exercise.exists():
                return {'error': 'Exercise not found', 'status': 404}

            exercise.unlink()
            return {'status': 'success', 'message': 'Exercise removed successfully'}

        except Exception as e:
            _logger.error(f"Error removing exercise from session: {str(e)}")
            return {'error': str(e), 'status': 500}

    @http.route('/api/session/<int:session_id>/exercises/reorder', type='json', auth='user', methods=['POST'])
    def reorder_session_exercises(self, session_id, **kwargs):
        """Змінити порядок вправ у сесії"""
        try:
            session = request.env['therapy.session'].browse(session_id)
            if not session.exists():
                return {'error': 'Session not found', 'status': 404}

            data = request.jsonrequest
            exercise_orders = data.get('exercise_orders', [])  # [{'id': 1, 'order': 1}, ...]

            for item in exercise_orders:
                exercise = request.env['therapy.session.exercise'].browse(item['id'])
                if exercise.exists() and exercise.session_id.id == session_id:
                    exercise.write({'order_number': item['order']})

            return {'status': 'success', 'message': 'Exercise order updated successfully'}

        except Exception as e:
            _logger.error(f"Error reordering exercises: {str(e)}")
            return {'error': str(e), 'status': 500}