import { useState, useEffect } from 'react';
import  type { ITask } from '../types';
import  { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const columns: { key: ITask['status']; label: string; color: string }[] = [
  { key: 'todo',       label: 'Todo',        color: '#6b7599' },
  { key: 'inprogress', label: 'In Progress', color: '#f59e0b' },
  { key: 'done',       label: 'Done',        color: '#22c55e' },
];

const Dashboard = () => {
  const { user, logout }        = useAuth();
  const navigate                = useNavigate();
  const [tasks,    setTasks]    = useState<ITask[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: Partial<ITask>) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      //console.log(id) ; 
      await deleteTask(id);
    //  console.log(res) ; 
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusChange = async (id: string, status: ITask['status']) => {
    try {
      const updated = await updateTask(id, { status });
      setTasks((prev) => prev.map((t) => t._id === id ? updated : t));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getTasksByStatus = (status: ITask['status']) =>
    tasks.filter((t) => t.status === status);

  if (loading) return (
    <div style={styles.loading}>Loading tasks...</div>
  );

  return (
    <div style={styles.container}>

      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>T</div>
          <span style={styles.brandName}>TaskFlow</span>
        </div>
        <div style={styles.topRight}>
          <span style={styles.welcome}>Hey, {user?.name} 👋</span>
          <button onClick={() => setShowModal(true)} style={styles.addBtn}>+ New Task</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total</span>
          <span style={styles.statValue}>{tasks.length}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Todo</span>
          <span style={{ ...styles.statValue, color: '#6b7599' }}>{getTasksByStatus('todo').length}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>In Progress</span>
          <span style={{ ...styles.statValue, color: '#f59e0b' }}>{getTasksByStatus('inprogress').length}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Done</span>
          <span style={{ ...styles.statValue, color: '#22c55e' }}>{getTasksByStatus('done').length}</span>
        </div>
      </div>

      {/* Kanban board */}
      <div style={styles.board}>
        {columns.map((col) => (
          <div key={col.key} style={styles.column}>
            <div style={styles.colHeader}>
              <div style={{ ...styles.colDot, background: col.color }} />
              <span style={{ ...styles.colTitle, color: col.color }}>{col.label}</span>
              <span style={styles.colCount}>{getTasksByStatus(col.key).length}</span>
            </div>
            <div style={styles.colBody}>
              {getTasksByStatus(col.key).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {getTasksByStatus(col.key).length === 0 && (
                <div style={styles.empty}>No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container:  { minHeight: '100vh', background: '#0f1117', padding: '0 0 2rem' },
  loading:    { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7599' },
  topbar:     { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#181c27', borderBottom: '1px solid #2a3050' },
  brand:      { display: 'flex', alignItems: 'center', gap: 8 },
  brandIcon:  { width: 32, height: 32, background: '#4f6ef7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 },
  brandName:  { fontSize: 16, fontWeight: 600, color: '#e8ecf8' },
  topRight:   { display: 'flex', alignItems: 'center', gap: 12 },
  welcome:    { fontSize: 13, color: '#6b7599' },
  addBtn:     { background: '#4f6ef7', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500 },
  logoutBtn:  { background: 'transparent', border: '1px solid #2a3050', color: '#6b7599', borderRadius: 8, padding: '8px 16px', fontSize: 13 },
  stats:      { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '1.5rem 2rem' },
  statCard:   { background: '#181c27', border: '1px solid #2a3050', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 4 },
  statLabel:  { fontSize: 11, color: '#6b7599', textTransform: 'uppercase', letterSpacing: '0.05em' },
  statValue:  { fontSize: 24, fontWeight: 600, color: '#e8ecf8' },
  board:      { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '0 2rem' },
  column:     { background: '#181c27', border: '1px solid #2a3050', borderRadius: 10, overflow: 'hidden' },
  colHeader:  { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderBottom: '1px solid #2a3050' },
  colDot:     { width: 8, height: 8, borderRadius: '50%' },
  colTitle:   { fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', flex: 1 },
  colCount:   { fontSize: 11, background: '#2a3050', color: '#6b7599', padding: '1px 7px', borderRadius: 10 },
  colBody:    { padding: 10, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 200 },
  empty:      { textAlign: 'center', color: '#2a3050', fontSize: 12, padding: '2rem 0' },
};

export default Dashboard;