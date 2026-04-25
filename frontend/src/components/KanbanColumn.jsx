import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const COLUMN_META = {
  todo: { label: '📋 To Do', cls: 'col-todo' },
  'in-progress': { label: '🔄 In Progress', cls: 'col-progress' },
  done: { label: '✅ Done', cls: 'col-done' },
};

export default function KanbanColumn({ status, tasks, onEdit, onDelete }) {
  const meta = COLUMN_META[status];
  return (
    <div className={`kanban-col ${meta.cls}`}>
      <div className="kanban-col__header">
        <h2 className="kanban-col__title">{meta.label}</h2>
        <span className="kanban-col__count">{tasks.length}</span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            className={`kanban-col__body ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(prov) => (
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    innerRef={prov.innerRef}
                    draggableProps={prov.draggableProps}
                    dragHandleProps={prov.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="kanban-col__empty">Drop tasks here</div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
