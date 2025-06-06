import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SessionHistoryPreview extends Component {
    static template = "doctor.sessionHistoryPreview";
    
    static props = {
        sessionData: Array,
        onSessionSelect: Function,
    };

    // Форматування дати
    formatDate(dateString) {
        if (!dateString) return "Not scheduled";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Отримання CSS класу для статусу сесії
    getSessionStatusClass(status) {
        const statusClasses = {
            'Completed': 'bg-success',
            'Cancelled': 'bg-danger',
            'In Progress': 'bg-primary',
            'Scheduled': 'bg-info',
            'Draft': 'bg-secondary'
        };
        return statusClasses[status] || 'bg-secondary';
    }

    // Отримання CSS класу для статусу зустрічі
    getAppointmentStatusClass(status) {
        const statusClasses = {
            'Completed': 'text-success',
            'Cancelled': 'text-danger', 
            'In Progress': 'text-primary',
            'Scheduled': 'text-info',
            'Draft': 'text-muted'
        };
        return statusClasses[status] || 'text-muted';
    }

    // Обробка кліку на карточку
    onCardClick(session) {
        this.props.onSessionSelect(session);
    }

    // Обрізання нотаток для попереднього перегляду
    truncateNotes(notes, maxLength = 80) {
        if (!notes) return "No notes available";
        return notes.length > maxLength ? notes.substring(0, maxLength) + "..." : notes;
    }
}

registry
    .category("public_components")
    .add("doctor.sessionHistoryPreview", SessionHistoryPreview);