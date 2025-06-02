from odoo import http
from odoo.http import request
class PartnerController(http.Controller):
    @http.route('/partners', type='http', auth='public', website=True)
    def partner_listing_page(self, **kwargs):
        return request.render('partner_website_listing.partner_listing_page')
    
    @http.route('/partners/data', type='json', auth='public', website=True)
    def get_partners(self):
        partners = request.env['res.partner'].sudo().search([])
        
        return {
            'partners': [{
                'id': partner.id,
                'name': partner.name,
                'image_url': f'/web/image/res.partner/{partner.id}/image_1024',
                'email': partner.email,
                'phone': partner.phone,
                'website': partner.website,
                'city': partner.city,
                'country': partner.country_id.name if partner.country_id else '',
            } for partner in partners]
        }
