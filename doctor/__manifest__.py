{
    "name": "doctor",
    "version": "1.0",
    'depends': ['base', 'website'],
    'data': [
        'views/website_template.xml',
        'views/website_menu.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'doctor/static/src/components/patientSnapshot/**/*',
            'doctor/static/src/components/tabs/**/*',
        ],
    },

    'installable': True,
    'application': False,
}
