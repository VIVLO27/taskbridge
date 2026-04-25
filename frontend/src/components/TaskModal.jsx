import { useState, useEffect } from 'react';

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskModal({ task, onSave, onClose, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(EMPTY);
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Title is required');
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{task?._id ? 'Edit Task' : 'New Task'}</h2>
          <button id="modal-close" className="btn btn-icon btn-ghost" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">Title *</label>
            <input id="task-title" name="title" className="form-control" value={form.title} onChange={handleChange} placeholder="Task title" />
            {error && <span className="form-error">{error}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="task-desc">Description</label>
            <textarea id="task-desc" name="description" className="form-control" value={form.description} onChange={handleChange} placeholder="Optional description" rows={3} />
          </div>
          <div className="modal__row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-status">Status</label>
              <select id="task-status" name="status" className="form-control" value={form.status} onChange={handleChange}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority">Priority</label>
              <select id="task-priority" name="priority" className="form-control" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="task-due">Due Date</label>
            <input id="task-due" name="dueDate" type="date" className="form-control" value={form.dueDate} onChange={handleChange} />
          </div>
          <div className="modal__footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button id="save-task-btn" type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : task?._id ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
