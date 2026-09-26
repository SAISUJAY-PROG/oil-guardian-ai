import { useState } from "react";
import {
  ShieldCheck,
  User,
  HardHat,
  ArrowRight,
  LockKeyhole,
  Mail,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [role, setRole] = useState("employee");
  const [view, setView] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Enter username and password.");
      return;
    }

    setError("");

    if (role === "employee") {
      navigate("/employee");
    } else {
      navigate("/officer");
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Enter your registered email address.");
      return;
    }

    setError("");
    setMessage("Password reset instructions have been sent to your email.");
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");
    setMessage("Account created successfully. You can now sign in.");
    setView("login");
  };

  const changeView = (newView) => {
    setView(newView);
    setError("");
    setMessage("");
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="login-page">
      <div className="login-background-glow" />

      <div className="login-container">
        <motion.div
          className="login-brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-brand-icon">
            <ShieldCheck size={34} />
          </div>
          <h1>OIL Guardian AI</h1>
          <p>INDUSTRIAL SAFETY INTELLIGENCE PLATFORM</p>
        </motion.div>

        <div className="login-card">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div key="login" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <div className="login-heading">
                  <span>SECURE ACCESS</span>
                  <h2>Welcome Back</h2>
                  <p>Sign in to access the OIL Guardian safety operations system.</p>
                </div>

                <div className="role-selection">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={role === "employee" ? "role-card active cursor-target" : "role-card cursor-target"}
                    onClick={() => { setRole("employee"); setError(""); }}
                  >
                    <div className="role-icon"><HardHat size={23} /></div>
                    <div>
                      <strong>Employee</strong>
                      <span>Field Operations Terminal</span>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={role === "officer" ? "role-card active cursor-target" : "role-card cursor-target"}
                    onClick={() => { setRole("officer"); setError(""); }}
                  >
                    <div className="role-icon"><ShieldCheck size={23} /></div>
                    <div>
                      <strong>Safety Officer</strong>
                      <span>Safety Operations Command</span>
                    </div>
                  </motion.button>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="login-field">
                    <label><User size={14} /> USERNAME</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="cursor-target"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="login-field">
                    <label><LockKeyhole size={14} /> PASSWORD</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="cursor-target"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="login-options">
                    <label className="remember-me cursor-target">
                      <input type="checkbox" className="cursor-target" />
                      <span>Remember me</span>
                    </label>
                    <motion.button
                      type="button"
                      className="forgot-link cursor-target"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => changeView("forgot")}
                    >
                      Forgot Password?
                    </motion.button>
                  </div>

                  {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-error">{error}</motion.div>}
                  {message && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-success">{message}</motion.div>}

                  <motion.button
                    type="submit"
                    className="login-button cursor-target"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>SIGN IN AS {role === "employee" ? "EMPLOYEE" : "SAFETY OFFICER"}</span>
                    <ArrowRight size={19} />
                  </motion.button>
                </form>

                <div className="create-account-row">
                  <span>Don't have an account?</span>
                  <motion.button
                    type="button"
                    className="cursor-target"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => changeView("create")}
                    style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, fontSize: '13px' }}
                  >
                    Create Account
                  </motion.button>
                </div>
              </motion.div>
            )}

            {view === "forgot" && (
              <motion.div key="forgot" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <div className="login-heading">
                  <span>ACCOUNT RECOVERY</span>
                  <h2>Forgot Password?</h2>
                  <p>Enter your registered email address and we'll send instructions to reset your password.</p>
                </div>

                <form onSubmit={handleForgotPassword}>
                  <div className="login-field">
                    <label><Mail size={14} /> REGISTERED EMAIL</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="cursor-target"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {error && <div className="login-error">{error}</div>}
                  {message && <div className="login-success">{message}</div>}

                  <motion.button type="submit" className="login-button cursor-target" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <span>SEND RESET INSTRUCTIONS</span>
                    <ArrowRight size={19} />
                  </motion.button>
                </form>

                <motion.button
                  className="back-login cursor-target"
                  whileHover={{ x: -5 }}
                  onClick={() => changeView("login")}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', margin: '20px auto 0', fontSize: '13px' }}
                >
                  <ArrowLeft size={16} /> Back to Login
                </motion.button>
              </motion.div>
            )}

            {view === "create" && (
              <motion.div key="create" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <div className="login-heading">
                  <span>NEW USER REGISTRATION</span>
                  <h2>Create Account</h2>
                  <p>Create your OIL Guardian AI account and select your operational role.</p>
                </div>

                <div className="role-selection">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={role === "employee" ? "role-card active cursor-target" : "role-card cursor-target"}
                    onClick={() => setRole("employee")}
                  >
                    <div className="role-icon"><HardHat size={21} /></div>
                    <div>
                      <strong>Employee</strong>
                      <span>Field Operations</span>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={role === "officer" ? "role-card active cursor-target" : "role-card cursor-target"}
                    onClick={() => setRole("officer")}
                  >
                    <div className="role-icon"><ShieldCheck size={21} /></div>
                    <div>
                      <strong>Safety Officer</strong>
                      <span>Safety Command</span>
                    </div>
                  </motion.button>
                </div>

                <form onSubmit={handleCreateAccount}>
                  <div className="login-field">
                    <label><User size={14} /> FULL NAME</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="cursor-target"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="login-field">
                    <label><Mail size={14} /> EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="cursor-target"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="login-field">
                    <label><LockKeyhole size={14} /> CREATE PASSWORD</label>
                    <input
                      type="password"
                      placeholder="Create password"
                      className="cursor-target"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-error">{error}</motion.div>}
                  {message && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-success">{message}</motion.div>}

                  <motion.button
                    type="submit"
                    className="login-button cursor-target"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight size={19} />
                  </motion.button>
                </form>

                <motion.button
                  className="back-login cursor-target"
                  whileHover={{ x: -5 }}
                  onClick={() => changeView("login")}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', margin: '20px auto 0', fontSize: '13px' }}
                >
                  <ArrowLeft size={16} /> Back to Login
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="login-security">
            <span className="login-status-dot" /> SECURE OIL GUARDIAN ACCESS
          </div>
        </div>

        <motion.div
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          OIL GUARDIAN AI · INDUSTRIAL SAFETY INTELLIGENCE
        </motion.div>
      </div>
    </div>
  );
}

export default Login;