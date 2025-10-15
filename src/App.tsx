
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import LoginCard from "./components/LoginCard";
import EmailTable from "./components/EmailTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrationForm from "./components/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

type User = {
  userId: string;
  email: string;
};

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

  useEffect(() => {                                      // fech logged user
    async function fetchCurrentUser() {
      try {
        const res = await fetch("https://localhost:7262/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setCurrentUser(data);
      } catch {
        setCurrentUser(null);
      }
    }
    fetchCurrentUser();
  }, []);

  useEffect(() => {                                           // fetch users
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

 
  // checking refresh button
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

  // Fetch emails whenever selectedUserId changes
  useEffect(() => {
    fetchEmails(selectedUserId);
  }, [selectedUserId]);


  const handleLogins = () => {
    window.location.href = "https://localhost:7262/api/auth/login";
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
                <div className="container-fluid" style={{ backgroundColor: "#bed8deff", minHeight: "100vh", paddingTop: "20px" }}>
                   {selectedUserId ? (
                  loading ? (
                    <div style={{ textAlign: "center", marginTop: "20px " }}>
                      <span className="spinner-border text-primary me-2" role="status"></span>
                      <p>Loading email...</p>
                    </div>
                  ) : (
                    // changing  this  parameters
                    <EmailTable emails={emails} userId={selectedUserId}   />
                  )
                ) : (
                  <div style={{ textAlign: "center", marginTop: "30px"   }}>
                    <h4 className="text-center  text-danger" >
                      Please select a dropdown-list  /  Sing-in with Google !!
                    </h4>
                    
                  </div>
                )}
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



                // show the model

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
// const InfoModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
//   if (!show) return null;
//   return (
//     <div style={styles.overlay} >
//       <div style={styles.modal }  className="bg-dark">
//         {/* <img
//           src='("login.jpg")'// aap image ko public folder me rakhe
//           alt="Select Dropdown"
//           style={{ width: "120px", marginBottom: "20px" }} 
//         /> */}
//         <h4 className="text-white">Please select a dropdown-list / Sign-in with Google</h4>
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
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   modal: {
//     backgroundColor: "#fff",
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
// type Email = { id: string; from?: string; subject?: string; snippet?: string; body?: string; date?: string; userId?: string };

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
//         const res = await fetch("https://localhost:7262/api/auth/me", { credentials: "include" });
//         if (!res.ok) throw new Error("Not logged in");
//         const data = await res.json();
//         setCurrentUser(data);
//         if (data && !selectedUserId) setSelectedUserId(data.userId); // auto-select current user
//       } catch {
//         setCurrentUser(null);
//       }
//     }
//     fetchCurrentUser();
//   }, );

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get<User[]>("https://localhost:7262/api/Users", { withCredentials: true });
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
//       const res = await axios.get<Email[]>(`https://localhost:7262/api/Users/inbox/${userId}`, { withCredentials: true });
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
//         <Route path="/login" element={<PublicRoute><LoginCard handleLogin={handleLogins} /></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute><RegistrationForm /></PublicRoute>} />
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
//                 <div className="container-fluid" style={{ backgroundColor: "#bed8deff", minHeight: "100vh", paddingTop: "20px" }}>
//                   {selectedUserId ? (
//                     loading ? (
//                       <div style={{ textAlign: "center", marginTop: "20px" }}>
//                         <span className="spinner-border text-primary me-2" role="status"></span>
//                         <p>Loading email...</p>
//                       </div>
//                     ) : (
//                       <EmailTable emails={emails} userId={selectedUserId} />
//                     )
//                   ) : null}
//                   {/* Modal */}
//                   <InfoModal show={showModal} onClose={() => setShowModal(false)} />
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

