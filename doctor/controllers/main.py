from odoo import http
from odoo.http import request

class DoctorWebsite(http.Controller):
    @http.route(['/doctor-page'], type='http', auth="public", website=True)
    def doctor_page(self, **kw):
        return request.render("doctor.doctor_page")
