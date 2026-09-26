import { useState } from "react";
import { User, Power, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountControls({ role }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="account-controls">
        <button
          className="account-user-button cursor-target"
          onClick={() => setShowProfile(true)}
        >
          <div className="profile-icon-blue"><User size={14} /></div>
          {role} (Active)
          <ChevronDown size={14} className="text-muted" />
        </button>
        <button
          className="account-logout-button cursor-target"
          onClick={() => navigate("/")}
          title="Secure Logout"
        >
          <Power size={14} />
          <span>Logout</span>
        </button>
      </div>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="profile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="profile-modal">
              <button
                className="profile-close cursor-target"
                onClick={() => setShowProfile(false)}
              >
                <X size={24} />
              </button>

              <div className="profile-header">
                <div className="profile-avatar"><User size={34} /></div>
                <div className="profile-heading">
                  <h2>Mahamad Huzaif Patel</h2>
                  <h3>{role}</h3>
                  <span className="profile-certification">OISD Certified Active</span>
                </div>
              </div>

              <div className="profile-divider" />

              <div className="profile-info">
                <div className="profile-row"><span>Company</span><strong>Oil India Limited</strong></div>
                <div className="profile-row"><span>Primary Division</span><strong>Exploration & Production (E&P)</strong></div>
                <div className="profile-row"><span>Current Status</span><strong className="text-green">Active on Station</strong></div>
              </div>

              <button
                className="close-profile-button cursor-target"
                onClick={() => setShowProfile(false)}
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}