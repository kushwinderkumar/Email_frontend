
// show the modal              fully working

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import LoginCard from "./components/LoginCard";
// import EmailTable from "./components/EmailTable";
// import RegistrationForm from "./components/RegistrationForm";
// import PublicRoute from "./components/PublicRoute";
// import PrivateRoute from "./components/PrivateRoute";

// // Modal Component
// const InfoModal: React.FC<{ show: boolean; onClose: () => void }> = ({
//   show,
//   onClose,
// }) => {
//   if (!show) return null;
//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal} className="bg-dark">
//         <h4 className="text-warning">
//           Please select a Gmail-User. <br></br> Sign-in with Google
//         </h4>
//         <br />
//         <p className="text-white">Please press the Button / dropdown</p>
//         <button style={styles.button} onClick={onClose}>
//           OK
//         </button>
//       </div>
//     </div>
//   );
// };

// // Modal Styles
// const styles: { [key: string]: React.CSSProperties } = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(33, 31, 31, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   modal: {
//     backgroundColor: "#f3eaeaff",
//     padding: "30px",
//     borderRadius: "12px",
//     textAlign: "center",
//     maxWidth: "400px",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//   },
//   button: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     borderRadius: "8px",
//     border: "none",
//     backgroundColor: "#0d6efd",
//     color: "#fff",
//     cursor: "pointer",
//   },
// };

// // Types
// type User = { userId: string; email: string };
// type Email = {
//   id: string;
//   from?: string;
//   subject?: string;
//   snippet?: string;
//   body?: string;
//   date?: string;
//   userId?: string;
// };

// const App: React.FC = () => {
//   const [, setCurrentUser] = useState<User | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch current logged-in user
//   useEffect(() => {
//     async function fetchCurrentUser() {
//       try {
//         const res = await fetch("https://localhost:7262/api/auth/me", {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Not logged in");
//         const data = await res.json();
//         setCurrentUser(data);
//         if (data && !selectedUserId) setSelectedUserId(data.userId); // auto-select current user
//       } catch {
//         setCurrentUser(null);
//       }
//     }
//     fetchCurrentUser();
//   });

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get<User[]>(
//           "https://localhost:7262/api/Users",
//           { withCredentials: true }
//         );
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch emails for selected user
//   const fetchEmails = async (userId: string | null) => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       const res = await axios.get<Email[]>(
//         `https://localhost:7262/api/Users/inbox/${userId}`,
//         { withCredentials: true }
//       );
//       setEmails(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Error fetching emails:", err);
//       setEmails([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmails(selectedUserId);
//   }, [selectedUserId]);

//   // Show modal if no user selected
//   useEffect(() => {
//     setShowModal(!selectedUserId);
//   }, [selectedUserId]);

//   // Handle login
//   const handleLogins = () => {
//     window.location.href = "https://localhost:7262/api/auth/login";
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <LoginCard handleLogin={handleLogins} />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <RegistrationForm />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <>
//                 <Navbar
//                   users={users}
//                   selectedUserId={selectedUserId}
//                   setSelectedUserId={setSelectedUserId}
//                   setCurrentUser={setCurrentUser}
//                   onRefreshInbox={() => fetchEmails(selectedUserId)}
//                 />
//                 <div
//                   className="container-fluid"
//                   style={{
//                     backgroundColor: "#bed8deff",
//                     minHeight: "100vh",
//                     paddingTop: "20px",
//                     position: "relative",
//                   }}
//                 >
//                   {selectedUserId ? (
//                     loading ? (
//                       <>
//                         {/* Overlay Spinner */}
//                         <div
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             backgroundColor: "rgba(255,255,255,0.6)", // optional blur effect
//                             zIndex: 9999,
//                           }}
//                         >
//                           <div className="text-center">
//                             <div
//                               className="spinner-border text-primary"
//                               role="status"
//                               style={{ width: "3rem", height: "3rem" }}
//                             ></div>
//                             <p className="mt-3 text-dark fw-bold">
//                               Loading email...
//                             </p>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <EmailTable emails={emails} userId={selectedUserId} />
//                     )
//                   ) : null}

//                   {/* Modal */}
//                   <InfoModal
//                     show={showModal}
//                     onClose={() => setShowModal(false)}
//                   />
//                 </div>
//               </>
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginCard from "./components/LoginCard";
import EmailTable from "./components/EmailTable";
import RegistrationForm from "./components/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

// Modal Component
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
        <p className="text-white">Please press the Button / dropdown</p>
        <button style={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

// Modal Styles
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

// Types
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
  const [, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch current logged-in user & auto-select
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("https://localhost:7262/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setCurrentUser(data);

        if (data?.userId) {
          setSelectedUserId(data.userId);
          await fetchEmails(data.userId);
        } else {
          setShowModal(true);
        }
      } catch {
        setCurrentUser(null);
        setShowModal(true);
      }
    }
    init();
  }, []);

  // Fetch all users
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

  // Fetch emails for selected user
  const fetchEmails = async (userId: string | null) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get<Email[]>(
        `https://localhost:7262/api/Users/inbox/${userId}`,
        { withCredentials: true }
      );
      setEmails(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch emails whenever selectedUserId changes (dropdown)
  useEffect(() => {
    if (selectedUserId) {
      fetchEmails(selectedUserId);
    }
  }, [selectedUserId]);

  // Handle login button
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
                  setCurrentUser={setCurrentUser}
                  onRefreshInbox={() => fetchEmails(selectedUserId)}
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
                  {selectedUserId ? (
                    loading ? (
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
                      <EmailTable emails={emails} userId={selectedUserId} />
                    )
                  ) : null}

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
