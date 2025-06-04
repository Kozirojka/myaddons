import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class Task extends Component {
  static template = "doctor.Task";

  static props = {
    task: Object,
  };

  setup() {
    this.state = useState({
      showCommentForm: false,
      commentText: ""
    });
  }

  toggleCommentForm() {
    this.state.showCommentForm = !this.state.showCommentForm;
    if (!this.state.showCommentForm) {
      this.state.commentText = "";
    }
  }

  cancelComment() {
    this.state.showCommentForm = false;
    this.state.commentText = "";
  }

  saveComment(event) {
    event.preventDefault();
    if (this.state.commentText.trim()) {
      console.log('Saving comment for task:', this.props.task.id, 'Comment:', this.state.commentText);
      this.state.showCommentForm = false;
      this.state.commentText = "";
    }
  }
}

registry.category("public_components").add("doctor.Task", Task);
