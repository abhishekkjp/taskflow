import type { ITask } from '../types';

interface Props {
  task: ITask;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ITask['status']) => void;
}

const priorityColors: Record<string, string> = {
  low:    '#22c55e',
  medium: '#f59e0b',
  high:   '#ef4444',
};

const TaskCard = ({ task, onDelete, onStatusChange }: Props) => {
  return (
    <div style={styles.card}>

      {/* Priority dot + title */}
      <div style={styles.top}>
        <div style={{
          ...styles.priorityDot,
          background: priorityColors[task.priority]
        }} />
        <span style={styles.title}>{task.title}</span>
      </div>

      {/* Description */}
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div style={styles.tags}>
          {task.tags.map((tag) => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {task.progress > 0 && (
        <div style={styles.progressBg}>
          <div style={{
            ...styles.progressFill,
            width: `${task.progress}%`,
          }} />
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value as ITask['status'])}
          style={styles.select}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => onDelete(task._id)}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card:         { background: '#1e2336', border: '1px solid #2a3050', borderRadius: 8, padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 },
  top:          { display: 'flex', alignItems: 'flex-start', gap: 8 },
  priorityDot:  { width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 4 },
  title:        { fontSize: 13, fontWeight: 500, color: '#e8ecf8', lineHeight: 1.4 },
  description:  { fontSize: 12, color: '#6b7599', lineHeight: 1.5 },
  tags:         { display: 'flex', flexWrap: 'wrap', gap: 4 },
  tag:          { fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#2a3050', color: '#7c9ef7' },
  progressBg:   { height: 3, background: '#2a3050', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#4f6ef7', borderRadius: 2, transition: 'width 0.3s' },
  actions:      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  select:       { background: '#2a3050', border: '1px solid #3a4060', borderRadius: 6, color: '#e8ecf8', fontSize: 11, padding: '3px 6px' },
  deleteBtn:    { background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: 6, padding: '3px 8px', fontSize: 11 },
};

export default TaskCard;