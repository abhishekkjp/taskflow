import { useState } from 'react';
import  type { ITask } from '../types';

interface Props {
  onAdd: (task: Partial<ITask>) => void;
  onClose: () => void;
}

const AddTaskModal = ({ onAdd, onClose }: Props) => {
  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [priority,    setPriority]    = useState<ITask['priority']>('medium');
  const [status,      setStatus]      = useState<ITask['status']>('todo');
  const [tags,        setTags]        = useState('');
  const [progress,    setProgress]    = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      priority,
      status,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      progress,
    });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span style={styles.headerTitle}>New Task</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Task title"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, minHeight: 80, resize: 'vertical' }}
              placeholder="Task description"
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ITask['priority'])}
                style={styles.input}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ITask['status'])}
                style={styles.input}
              >
                <option value="todo">Todo</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={styles.input}
              placeholder="AWS, Frontend, Backend"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Progress: {progress}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={styles.btnRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay:     { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal:       { background: '#181c27', border: '1px solid #2a3050', borderRadius: 12, padding: '1.5rem', width: '100%', maxWidth: 480 },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  headerTitle: { fontSize: 16, fontWeight: 600, color: '#e8ecf8' },
  closeBtn:    { background: 'transparent', border: 'none', color: '#6b7599', fontSize: 16 },
  form:        { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field:       { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 },
  label:       { fontSize: 12, color: '#6b7599' },
  input:       { background: '#1e2336', border: '1px solid #2a3050', borderRadius: 8, padding: '8px 12px', color: '#e8ecf8', fontSize: 13 },
  row:         { display: 'flex', gap: '1rem' },
  btnRow:      { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 4 },
  cancelBtn:   { background: 'transparent', border: '1px solid #2a3050', color: '#6b7599', borderRadius: 8, padding: '8px 16px', fontSize: 13 },
  submitBtn:   { background: '#4f6ef7', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500 },
};

export default AddTaskModal;