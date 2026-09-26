import { useState } from "react";
import {
  UserCircle,
  LogOut,
  ChevronDown,
  X,
  HardHat,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccountControls({ role = "Employee" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isEmployee = role === "Employee";

  const profile = isEmployee
    ? {
        id: "oil-79655",
        job: "Field Technician / Senior Roughneck",
        certification: "OISD Certified Active",
        company: "Oil India Limited",
        division: "Exploration & Production (E&P)",
        incidents: "3 Reports",
        station: "Duliajan Oilfield · Rig 04"
      }
    : {
        id: "oil-so-2041",
        job: "Safety Officer",
        certification: "OISD Certified Active",
        company: "Oil India Limited",
        division: "Health, Safety & Environment",
        incidents: "17 Reports",
        station: "Duliajan Oilfield · Safety Command"
      };

  const handleLogout = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="account-controls">

        <button
          className="account-user-button"
          onClick={() => setOpen(true)}
        >
          <span className="account-user-icon">
            {isEmployee ? (
              <HardHat size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
          </span>

          <span className="account-user-id">
            {profile.id}
          </span>

          <ChevronDown size={15} />
        </button>

        <button
          className="account-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

      </div>

      {open && (
        <div
          className="profile-overlay"
          onClick={() => setOpen(false)}
        >

          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="profile-close"
              onClick={() => setOpen(false)}
            >
              <X size={25} />
            </button>

            <div className="profile-header">

              <div className="profile-avatar">
                {isEmployee ? (
                  <HardHat size={39} />
                ) : (
                  <ShieldCheck size={39} />
                )}
              </div>

              <div className="profile-heading">

                <h2>{profile.id}</h2>

                <h3>{profile.job}</h3>

                <span className="profile-certification">
                  {profile.certification}
                </span>

              </div>

            </div>

            <div className="profile-divider" />

            <div className="profile-info">

              <div className="profile-row">
                <span>Company</span>
                <strong>{profile.company}</strong>
              </div>

              <div className="profile-row">
                <span>Primary Division</span>
                <strong>{profile.division}</strong>
              </div>

              <div className="profile-row">
                <span>Total Incidents Logged</span>
                <strong className="profile-orange">
                  {profile.incidents}
                </strong>
              </div>

              <div className="profile-row">
                <span>Last Active Station</span>
                <strong>{profile.station}</strong>
              </div>

            </div>

            <button
              className="close-profile-button"
              onClick={() => setOpen(false)}
            >
              Close Profile
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default AccountControls;