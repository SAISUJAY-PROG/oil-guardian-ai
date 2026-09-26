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
    setMessage(
      "Password reset instructions have been sent to your email."
    );
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");

    setMessage(
      "Account created successfully. You can now sign in."
    );

    setView("login");
  };

  const changeView = (newView) => {
    setView(newView);
    setError("");
    setMessage("");
  };

  return (
    <div className="login-page">

      <div className="login-background-glow" />

      <div className="login-container">

        <div className="login-brand">
          <div className="login-brand-icon">
            <ShieldCheck size={34} />
          </div>

          <h1>OIL Guardian AI</h1>

          <p>
            INDUSTRIAL SAFETY INTELLIGENCE PLATFORM
          </p>
        </div>

        <div className="login-card">

          {view === "login" && (
            <>
              <div className="login-heading">
                <span>SECURE ACCESS</span>

                <h2>Welcome Back</h2>

                <p>
                  Sign in to access the OIL Guardian safety
                  operations system.
                </p>
              </div>

              <div className="role-selection">

                <button
                  type="button"
                  className={
                    role === "employee"
                      ? "role-card active"
                      : "role-card"
                  }
                  onClick={() => {
                    setRole("employee");
                    setError("");
                  }}
                >
                  <div className="role-icon">
                    <HardHat size={23} />
                  </div>

                  <div>
                    <strong>Employee</strong>
                    <span>
                      Field Operations Terminal
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    role === "officer"
                      ? "role-card active"
                      : "role-card"
                  }
                  onClick={() => {
                    setRole("officer");
                    setError("");
                  }}
                >
                  <div className="role-icon">
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <strong>Safety Officer</strong>
                    <span>
                      Safety Operations Command
                    </span>
                  </div>
                </button>

              </div>

              <form onSubmit={handleLogin}>

                <div className="login-field">

                  <label>
                    <User size={14} />
                    USERNAME
                  </label>

                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                  />

                </div>

                <div className="login-field">

                  <label>
                    <LockKeyhole size={14} />
                    PASSWORD
                  </label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                  />

                </div>

                <div className="login-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() =>
                      changeView("forgot")
                    }
                  >
                    Forgot Password?
                  </button>
                </div>

                {error && (
                  <div className="login-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="login-success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-button"
                >
                  <span>
                    SIGN IN AS{" "}
                    {role === "employee"
                      ? "EMPLOYEE"
                      : "SAFETY OFFICER"}
                  </span>

                  <ArrowRight size={19} />
                </button>

              </form>

              <div className="create-account-row">
                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    changeView("create")
                  }
                >
                  Create Account
                </button>
              </div>
            </>
          )}

          {view === "forgot" && (
            <>
              <div className="login-heading">
                <span>ACCOUNT RECOVERY</span>

                <h2>Forgot Password?</h2>

                <p>
                  Enter your registered email address and
                  we'll send instructions to reset your
                  password.
                </p>
              </div>

              <form onSubmit={handleForgotPassword}>

                <div className="login-field">

                  <label>
                    <Mail size={14} />
                    REGISTERED EMAIL
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />

                </div>

                {error && (
                  <div className="login-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="login-success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-button"
                >
                  <span>SEND RESET INSTRUCTIONS</span>
                  <ArrowRight size={19} />
                </button>

              </form>

              <button
                className="back-login"
                onClick={() =>
                  changeView("login")
                }
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </>
          )}

          {view === "create" && (
            <>
              <div className="login-heading">
                <span>NEW USER REGISTRATION</span>

                <h2>Create Account</h2>

                <p>
                  Create your OIL Guardian AI account and
                  select your operational role.
                </p>
              </div>

              <div className="role-selection">

                <button
                  type="button"
                  className={
                    role === "employee"
                      ? "role-card active"
                      : "role-card"
                  }
                  onClick={() =>
                    setRole("employee")
                  }
                >
                  <div className="role-icon">
                    <HardHat size={21} />
                  </div>

                  <div>
                    <strong>Employee</strong>
                    <span>Field Operations</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    role === "officer"
                      ? "role-card active"
                      : "role-card"
                  }
                  onClick={() =>
                    setRole("officer")
                  }
                >
                  <div className="role-icon">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <strong>Safety Officer</strong>
                    <span>Safety Command</span>
                  </div>
                </button>

              </div>

              <form onSubmit={handleCreateAccount}>

                <div className="login-field">

                  <label>
                    <User size={14} />
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                  />

                </div>

                <div className="login-field">

                  <label>
                    <Mail size={14} />
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />

                </div>

                <div className="login-field">

                  <label>
                    <LockKeyhole size={14} />
                    CREATE PASSWORD
                  </label>

                  <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                  />

                </div>

                {error && (
                  <div className="login-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="login-success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-button"
                >
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight size={19} />
                </button>

              </form>

              <button
                className="back-login"
                onClick={() =>
                  changeView("login")
                }
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </>
          )}

          <div className="login-security">
            <span className="login-status-dot" />
            SECURE OIL GUARDIAN ACCESS
          </div>

        </div>

        <div className="login-footer">
          OIL GUARDIAN AI · INDUSTRIAL SAFETY INTELLIGENCE
        </div>

      </div>
    </div>
  );
}

export default Login;