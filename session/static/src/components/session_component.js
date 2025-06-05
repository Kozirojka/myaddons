/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

export class SessionComponent extends Component {
    static template = "session.SessionComponent";
    static props = {
        session_id: { type: Number, optional: false }
    };

    setup() {
        console.log('SessionComponent setup - session_id:', this.props.session_id);

        const sessionId = this.props.session_id || window.DEBUG_SESSION_ID;
        console.log('Session ID:', sessionId);

        this.state = useState({
            session_id: sessionId,
            session: {},
            exercises: [],
            statuses: [],
            availableExercises: [],
            isEditing: false,
            isLoading: true,
            tempNotes: '',
            selectedStatusId: null,
            showExerciseModal: false,
            selectedExerciseId: null,
            notification: { show: false, message: '', type: 'success' },
            error: null
        });

        onWillStart(async () => {
            await this.loadSessionData();
            await this.loadStatuses();
            await this.loadAvailableExercises();
            this.state.isLoading = false;
        });
    }

    async loadSessionData() {
        try {
            const response = await new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/session/${this.state.session_id}/data`,
                    method: 'GET',
                    dataType: 'json',
                    success: resolve,
                    error: (jqXHR) => reject(jqXHR.responseJSON || jqXHR.statusText),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                });
            });

            if (response.status === 'success') {
                this.state.session = response.data.session;
                this.state.exercises = response.data.exercises;
                this.state.tempNotes = response.data.session.notes || '';
                this.state.selectedStatusId = response.data.session.status_id;
            } else {
                this.state.error = response.error || 'Помилка завантаження даних сесії';
            }
        } catch (error) {
            console.error('Error loading session data:', error);
            this.state.error = 'Помилка завантаження даних сесії';
        }
    }

    async loadStatuses() {
        try {
            const response = await new Promise((resolve, reject) => {
                $.ajax({
                    url: '/api/session/statuses',
                    method: 'GET',
                    dataType: 'json',
                    success: resolve,
                    error: (jqXHR) => reject(jqXHR.responseJSON || jqXHR.statusText),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    xhrFields: {
                        withCredentials: true,
                    },
                });
            });
            if (response.status === 'success') {
                this.state.statuses = response.data;
            } else {
                console.error('Error loading statuses:', response.error);
            }
        } catch (error) {
            console.error('Error loading statuses:', error);
        }
    }


    async loadAvailableExercises() {
        try {
            const response = await new Promise((resolve, reject) => {
                $.ajax({
                    url: '/api/exercises/available',
                    method: 'GET',
                    dataType: 'json',
                    success: resolve,
                    error: (jqXHR) => reject(jqXHR.responseJSON || jqXHR.statusText),
                    xhrFields: {
                        withCredentials: true,
                    },
                });
            });

            if (response.status === 'success') {
                this.state.exercises = response.data;
            } else {
                console.error('Error loading exercises:', response.error);
            }
        } catch (error) {
            console.error('Error loading exercises:', error);
        }
    }


    toggleEdit() {
        if (this.state.isEditing) {
            // Скасовуємо зміни
            this.state.tempNotes = this.state.session.notes || '';
            this.state.selectedStatusId = this.state.session.status_id;
        }
        this.state.isEditing = !this.state.isEditing;
    }

    async saveSession() {
        try {
            const response = await rpc(`/api/session/${this.state.session.id}/update`, {
                notes: this.state.tempNotes,
                status_id: this.state.selectedStatusId
            });

            if (response.status === 'success') {
                this.state.session.notes = this.state.tempNotes;
                this.state.session.status_id = this.state.selectedStatusId;
                const selectedStatus = this.state.statuses.find(s => s.id === this.state.selectedStatusId);
                this.state.session.status_name = selectedStatus ? selectedStatus.name : '';

                this.state.isEditing = false;
                this.showNotification('Сесію збережено успішно!', 'success');
            } else {
                this.showNotification(response.error || 'Помилка при збереженні', 'danger');
            }
        } catch (error) {
            console.error('Error saving session:', error);
            this.showNotification('Помилка при збереженні сесії', 'danger');
        }
    }

    onNotesChange(event) {
        this.state.tempNotes = event.target.value;
    }

    onStatusChange(event) {
        this.state.selectedStatusId = parseInt(event.target.value) || null;
    }

    showAddExerciseModal() {
        this.state.showExerciseModal = true;
        this.state.selectedExerciseId = null;
    }

    hideExerciseModal() {
        this.state.showExerciseModal = false;
        this.state.selectedExerciseId = null;
    }

    onExerciseSelect(event) {
        this.state.selectedExerciseId = parseInt(event.target.value) || null;
    }

    async addExercise() {
        if (!this.state.selectedExerciseId) {
            this.showNotification('Виберіть вправу', 'warning');
            return;
        }

        try {
            const response = await rpc(`/api/session/${this.state.session.id}/exercises/add`, {
                exercise_case_id: this.state.selectedExerciseId
            });

            if (response.status === 'success') {
                this.state.exercises.push(response.data);
                this.hideExerciseModal();
                this.showNotification('Вправу додано успішно!', 'success');
            } else {
                this.showNotification(response.error || 'Помилка при додаванні вправи', 'danger');
            }
        } catch (error) {
            console.error('Error adding exercise:', error);
            this.showNotification('Помилка при додаванні вправи', 'danger');
        }
    }

    async removeExercise(exerciseId) {
        if (!confirm('Ви впевнені, що хочете видалити цю вправу?')) {
            return;
        }

        try {
            const response = await rpc(`/api/session/exercises/${exerciseId}/remove`);

            if (response.status === 'success') {
                this.state.exercises = this.state.exercises.filter(e => e.id !== exerciseId);
                this.showNotification('Вправу видалено успішно!', 'success');
            } else {
                this.showNotification(response.error || 'Помилка при видаленні вправи', 'danger');
            }
        } catch (error) {
            console.error('Error removing exercise from session:', error);
            this.showNotification('Помилка при видаленні вправи', 'danger');
        }
    }

    showNotification(message, type = 'success') {
        this.state.notification = { show: true, message, type };
        setTimeout(() => {
            this.state.notification.show = false;
        }, 4000);
    }

    hideNotification() {
        this.state.notification.show = false;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleString('uk-UA');
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    }
}

registry.category("public_components").add("session.SessionComponent", SessionComponent);