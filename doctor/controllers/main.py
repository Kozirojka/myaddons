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
                'phone': partner.phone
            }
        }