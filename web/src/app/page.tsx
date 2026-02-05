import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="BhoolGaya? Logo" style={{ height: '120px', width: 'auto' }} />
          </div>
          <p className="hero-tagline">If a task exists anywhere, it exists here.</p>
          <p className="hero-description">
            A personal task management system that never forgets for you.
            Built for students and learners who juggle tasks from college,
            projects, and life. Never miss a deadline again.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="hero-cta">
              Get Started
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="hero-secondary">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <h2 className="features-title">Why BhoolGaya?</h2>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">🔴</div>
              <h3 className="feature-title">Smart Aging</h3>
              <p className="feature-description">
                Tasks change color based on age. White for today, yellow for yesterday,
                blue for 2 days, red for critical. Never lose track.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Auto Carry-Forward</h3>
              <p className="feature-description">
                Incomplete tasks automatically move to the next day.
                Nothing falls through the cracks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Gentle Reminders</h3>
              <p className="feature-description">
                Friendly notifications that feel like a friend reminding you,
                not a robot commanding you.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon">⊞</div>
              <h3 className="feature-title">Eisenhower Matrix</h3>
              <p className="feature-description">
                Prioritize with Important × Urgent quadrants.
                Focus on what truly matters.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics</h3>
              <p className="feature-description">
                Track your productivity patterns. See your best days,
                streaks, and areas to improve.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3 className="feature-title">AI Challenges</h3>
              <p className="feature-description">
                Daily learning challenges powered by AI.
                Stay sharp with new concepts every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>
          BhoolGaya? © {new Date().getFullYear()} — Built with 💜 for students who want to remember everything without stress.
        </p>
      </footer>
    </div>
  );
}
