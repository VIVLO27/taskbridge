import { useState, useEffect, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import Footer from '../components/Footer';
import api from '../api/axios';

const STATUSES = ['todo', 'in-progress', 'done'];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const openCreate = () => { setEditTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditTask(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTask(null); };

  const handleSave = async (form) => {
    try {
      setSaving(true);
      if (editTask?._id) {
        const { data } = await api.put(`/tasks/${editTask._id}`, form);
        setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      } else {
        const { data } = await api.post('/tasks', form);
        setTasks((prev) => [data, ...prev]);
      }
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId;
    setTasks((prev) =>
      prev.map((t) => (t._id === draggableId ? { ...t, status: newStatus } : t))
    );
    try {
      await api.put(`/tasks/${draggableId}`, { status: newStatus });
    } catch {
      fetchTasks(); // rollback
    }
  };

  const tasksByStatus = STATUSES.reduce((acc, s) => {
    acc[s] = tasks.filter((t) => t.status === s);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="dashboard-header container">
          <div>
            <h1 className="dashboard-title">Your Board 📌</h1>
            <p className="dashboard-sub">
              {tasks.length === 0
                ? "Nothing here yet — add your first task!"
                : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} across all columns`}
            </p>
          </div>
          <button id="add-task-btn" className="btn btn-primary btn-lg" onClick={openCreate}>
            + Add a task
          </button>
        </div>

        {error && (
          <div className="container">
            <div className="alert alert-error">{error} <button onClick={() => setError('')}>✕</button></div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading tasks…</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board container">
              {STATUSES.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  tasks={tasksByStatus[status]}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </DragDropContext>
        )}
        <Footer />
      </main>

      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={closeModal}
          loading={saving}
        />
      )}
    </>
  );
}
