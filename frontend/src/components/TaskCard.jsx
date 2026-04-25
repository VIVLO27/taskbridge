const PRIORITY_MAP = {
  high: { label: 'High', cls: 'badge-high' },
  medium: { label: 'Medium', cls: 'badge-medium' },
  low: { label: 'Low', cls: 'badge-low' },
};

function getDueDateInfo(dueDate) {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return { diffDays, isOverdue: diffDays < 0, label: due.toLocaleDateString() };
}

export default function TaskCard({ task, onEdit, onDelete, draggableProps, dragHandleProps, innerRef }) {
  const priority = PRIORITY_MAP[task.priority] || PRIORITY_MAP.medium;
  const due = getDueDateInfo(task.dueDate);

  return (
    <div
      className={`task-card ${due?.isOverdue ? 'task-card--overdue' : ''}`}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <div className="task-card__header">
        <span className={`badge ${priority.cls}`}>{priority.label}</span>
        <div className="task-card__actions">
          <button
            id={`edit-task-${task._id}`}
            className="btn btn-icon btn-ghost"
            onClick={() => onEdit(task)}
            title="Edit task"
          >✏️</button>
          <button
            id={`delete-task-${task._id}`}
            className="btn btn-icon btn-danger"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >🗑️</button>
        </div>
      </div>

      <h3 className="task-card__title">{task.title}</h3>
      {task.description && (
        <p className="task-card__desc">{task.description}</p>
      )}

      {due && (
        <div className={`task-card__due ${due.isOverdue ? 'overdue' : due.diffDays <= 2 ? 'due-soon' : ''}`}>
          {due.isOverdue
            ? `⚠️ Overdue by ${Math.abs(due.diffDays)} day(s)`
            : due.diffDays === 0
            ? '📅 Due today'
            : `📅 ${due.diffDays}d left — ${due.label}`}
        </div>
      )}
    </div>
  );
}
