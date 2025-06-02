from odoo import http
from odoo.http import request

class DoctorWebsite(http.Controller):
    @http.route(['/doctor/patient/treatment'], type='http', auth="public", website=True)
    def doctor_page(self, **kw):
        return request.render("doctor.doctor_page")
