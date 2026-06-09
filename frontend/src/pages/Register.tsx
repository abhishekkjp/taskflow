import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const navigate   = useNavigate();

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await registerUser(name, email, password);
      console.log(data) ; 
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.log('registration failed') ; 
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>T</div>
          <span style={styles.brandName}>TaskFlow</span>
        </div>
        <p style={styles.subtitle}>Create your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Abhishek"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="abhishek@example.com"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container:  { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card:       { background: '#181c27', border: '1px solid #2a3050', borderRadius: 12, padding: '2rem', width: '100%', maxWidth: 380 },
  brand:      { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  brandIcon:  { width: 32, height: 32, background: '#4f6ef7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 },
  brandName:  { fontSize: 18, fontWeight: 600, color: '#e8ecf8' },
  subtitle:   { fontSize: 13, color: '#6b7599', marginBottom: '1.5rem' },
  error:      { background: '#2a1a1a', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 12px', borderRadius: 6, fontSize: 12, marginBottom: '1rem' },
  form:       { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field:      { display: 'flex', flexDirection: 'column', gap: 4 },
  label:      { fontSize: 12, color: '#6b7599' },
  input:      { background: '#1e2336', border: '1px solid #2a3050', borderRadius: 8, padding: '10px 12px', color: '#e8ecf8', fontSize: 13 },
  button:     { background: '#4f6ef7', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 500, marginTop: 4 },
  footer:     { textAlign: 'center', fontSize: 12, color: '#6b7599', marginTop: '1.5rem' },
  link:       { color: '#4f6ef7', textDecoration: 'none' },
};

export default Register;