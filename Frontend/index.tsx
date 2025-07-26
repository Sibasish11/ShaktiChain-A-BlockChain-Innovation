/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { render, h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import htm from 'htm';

const html = htm.bind(h);

const AppHeader = () => html`
  <header class="header">
    <h1>ShaktiChain</h1>
    <p>A Secure & Anonymous Feedback Platform</p>
  </header>
`;

const AppFooter = ({ onNavigateToAbout }) => html`
  <footer class="footer">
    <p>Empowering Voices with Secure Technology.</p>
    <div class="footer-links">
        <a href="#" onClick=${(e) => { e.preventDefault(); onNavigateToAbout(); }}>About ShaktiChain</a>
    </div>
  </footer>
`;

const BackButton = ({ onClick }) => html`
    <button onClick=${onClick} class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        <span>Back</span>
    </button>
`;

const LandingPage = ({ onSelectRole }) => {
  const handleKeyDown = (e, role) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRole(role);
    }
  };

  return html`
    <div class="landing-container">
        <h2 class="landing-title">Choose Your Role</h2>
        <p class="landing-subtitle">Select how you'd like to interact with ShaktiChain.</p>
        <div class="role-selection-container">
            <div 
                class="role-card individual-card" 
                onClick=${() => onSelectRole('individual')}
                onKeyDown=${(e) => handleKeyDown(e, 'individual')}
                role="button"
                tabindex="0"
                aria-label="Login as Individual"
            >
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3>For Individuals</h3>
                <p>Anonymously share feedback about campus issues and help create a better environment.</p>
                <span class="action-link">Share Feedback →</span>
            </div>
            <div 
                class="role-card organization-card" 
                onClick=${() => onSelectRole('organization')}
                onKeyDown=${(e) => handleKeyDown(e, 'organization')}
                role="button"
                tabindex="0"
                aria-label="Login as Organization"
            >
                <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <h3>For Organizations</h3>
                <p>Review anonymous feedback and validate reports to address important concerns.</p>
                <span class="action-link">View Reports →</span>
            </div>
        </div>
    </div>
  `;
};


const IndividualFeedbackPage = ({ onBack, onFeedbackSubmit }) => {
    const [feedback, setFeedback] = useState('');
    const [category, setCategory] = useState('Harassment');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            alert("Feedback cannot be empty.");
            return;
        }
        onFeedbackSubmit({ text: feedback.trim(), category });
        setSubmitted(true);
    };
    
    if (submitted) {
        return html`
            <div class="card">
                 <${BackButton} onClick=${onBack} />
                <div class="success-message">
                    <h3>Thank you!</h3>
                    <p>Your anonymous feedback has been submitted successfully.</p>
                </div>
            </div>
        `;
    }

    return html`
    <div class="card">
      <${BackButton} onClick=${onBack} />
        <form onSubmit=${handleSubmit}>
            <div class="form-group">
                <label for="feedback">Your Feedback (anonymous)</label>
                <textarea id="feedback" class="form-control" value=${feedback} onInput=${(e) => setFeedback(e.target.value)} required></textarea>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" class="form-control" value=${category} onChange=${(e) => setCategory(e.target.value)}>
                    <option>Harassment</option>
                    <option>Facilities</option>
                    <option>Academics</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit" class="btn btn-primary">Submit Feedback</button>
            </div>
        </form>
    </div>
  `;
};

const OrgLoginPage = ({ onLogin, onBack }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        onLogin();
    };
    
    return html`
        <div class="card">
            <${BackButton} onClick=${onBack} />
            <h2 style=${{textAlign: 'center', marginBottom: '2rem'}}>Organization Login</h2>
            <form onSubmit=${handleLogin}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" placeholder="admin@shaktichain.io" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" placeholder="••••••••" required />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    `;
};

const OrgDashboardPage = ({ onBack, feedbackList }) => {
    return html`
        <div class="card">
            <${BackButton} onClick=${onBack} />
            <h2 style=${{textAlign: 'center', marginBottom: '2rem'}}>Feedback Reports</h2>
            ${feedbackList.length === 0 
                ? html`<p class="empty-message">No feedback reports submitted yet.</p>` 
                : html`
                    <ul class="feedback-list">
                        ${[...feedbackList].reverse().map(item => html`
                            <li key=${item.id} class="feedback-item">
                                <div class="category">${item.category}</div>
                                <p>${item.text}</p>
                            </li>
                        `)}
                    </ul>
                `}
        </div>
    `;
};

const AboutPage = ({ onBack }) => html`
    <div class="card">
        <${BackButton} onClick=${onBack} />
        <h2 style=${{textAlign: 'center', marginBottom: '2rem'}}>About ShaktiChain</h2>
        <div class="about-content">
            <p>
                ShaktiChain is founded on the principle that every voice matters. In many institutions, especially colleges, students and individuals often face challenges in reporting sensitive issues like harassment, inadequate facilities, or academic concerns without fear of reprisal. 
            </p>
            <p>
                Our mission is to dismantle these barriers by providing a truly anonymous and secure platform for feedback. We are committed to ensuring that every submission is handled with care and that user privacy is paramount.
            </p>
            <p>
                <strong>Safeguarding Rights:</strong> We empower users to speak up, knowing their anonymity is protected.
            </p>
            <p>
                <strong>Justifying Voices:</strong> We create a direct and transparent channel to organizations, enabling them to address valid concerns and foster a better environment for everyone.
            </p>
            <p>
                ShaktiChain is more than a platform; it's a movement towards accountability, transparency, and empowerment.
            </p>
        </div>
    </div>
`;


const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'individual', 'orgLogin', 'orgDashboard', 'about'
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, text: "The library is too crowded during exam week. We need more study spaces available 24/7.", category: "Facilities" },
    { id: 2, text: "A professor in the CS department is consistently dismissive of female students' questions.", category: "Harassment" },
    { id: 3, text: "The curriculum for the economics major feels outdated and doesn't cover modern financial instruments.", category: "Academics" },
  ]);

  const navigate = useCallback((newView) => {
      setView(newView);
      window.scrollTo(0, 0);
  }, []);
  
  const handleAddFeedback = useCallback((newFeedback) => {
      setFeedbackList(prevList => [...prevList, { ...newFeedback, id: Date.now() }]);
  }, []);

  const handleSelectRole = (role) => {
    if (role === 'individual') {
      navigate('individual');
    } else {
      navigate('orgLogin');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'individual':
        return html`<${IndividualFeedbackPage} onBack=${() => navigate('landing')} onFeedbackSubmit=${handleAddFeedback} />`;
      case 'orgLogin':
        return html`<${OrgLoginPage} onBack=${() => navigate('landing')} onLogin=${() => navigate('orgDashboard')} />`;
      case 'orgDashboard':
        return html`<${OrgDashboardPage} onBack=${() => navigate('landing')} feedbackList=${feedbackList} />`;
      case 'about':
        return html`<${AboutPage} onBack=${() => navigate('landing')} />`;
      case 'landing':
      default:
        return html`<${LandingPage} onSelectRole=${handleSelectRole} />`;
    }
  };

  return html`
    <${AppHeader} />
    <main>
      ${renderContent()}
    </main>
    <${AppFooter} onNavigateToAbout=${() => navigate('about')} />
  `;
};

render(html`<${App} />`, document.getElementById('root'));