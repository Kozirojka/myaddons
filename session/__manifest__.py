{
    'name': 'Session Module',
    'version': '1.0.0',
    'category': 'Custom',
    'summary': 'Session management module with OWL components',
    'depends': ['base', 'calendar_extended', 'exercise', 'website', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/website_menu.xml',
        'views/website_template.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'session/static/src/components/**/*',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
}