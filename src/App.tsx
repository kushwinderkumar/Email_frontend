import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginCard from "./components/LoginCard";
import EmailTable from "./components/EmailTable";
import RegistrationForm from "./components/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const InfoModal: React.FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => {
  if (!show) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="bg-dark">
        <h4 className="text-warning">
          Please select a Gmail-User. <br />
          Sign-in with Google
        </h4>
        <br />
        <p className="text-white">Please press the Button / Dropdown</p>
        <button style={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(33, 31, 31, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#f3eaeaff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
  },
};
type User = { userId: string; email: string };
type Email = {
  id: string;
  from?: string;
  subject?: string;
  snippet?: string;
  body?: string;
  date?: string;
  userId?: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);

  useEffect(() => {
    async function init() {
      if (checkedUser) return; // prevent re-run

      try {
        const res = await fetch("https://localhost:7262/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();

        if (data?.userId) {
          setSelectedUserId(data.userId);
          await fetchEmails(data.userId);
        } else {
          setShowModal(true);
        }
      } catch {
        setShowModal(true);
      } finally {
        setCheckedUser(true);
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(
          "https://localhost:7262/api/Users",
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchEmails = useCallback(async (userId: string | null) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get<Email[]>(
        `https://localhost:7262/api/Users/inbox/${userId}`,
        { withCredentials: true }
      );
      const fetched = Array.isArray(res.data) ? res.data : [];
      setEmails(fetched);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (selectedUserId) {
      fetchEmails(selectedUserId);
    }
  }, [selectedUserId, fetchEmails]);

  const handleLogins = () => {
    window.location.href =
      "https://localhost:7262/api/auth/login?returnUrl=http://localhost:3000";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginCard handleLogin={handleLogins} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationForm />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  onRefreshInbox={async (userId) => await fetchEmails(userId)}
                />

                <div
                  className="container-fluid"
                  style={{
                    backgroundColor: "#bed8deff",
                    minHeight: "100vh",
                    paddingTop: "20px",
                    position: "relative",
                  }}
                >
                 
                  {loading && selectedUserId ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.6)",
                        zIndex: 9999,
                      }}
                    >
                      <div className="text-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                          style={{ width: "3rem", height: "3rem" }}
                        ></div>
                        <p className="mt-3 text-dark fw-bold">
                          Loading emails...
                        </p>
                      </div>
                    </div>
                  ) : (
                    selectedUserId && (
                      <EmailTable emails={emails} userId={selectedUserId} />
                    )
                  )}

                  <InfoModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                  />
                </div>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
