{
    'name': 'Website Partner Listing',
    'version': '1.0',
    'category': 'Website',
    'summary': 'Display partners in website with kanban view',
    'depends': ['website', 'contacts'],
    'data': [
        'views/website_menu.xml',
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'partner_website_listing/static/src/components/**/*',
            'partner_website_listing/static/src/scss/**/*',
        ],
    },
    'application': False,
    'installable': True,
}
