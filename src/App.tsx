// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import LoginCard from "./components/LoginCard";
// import EmailTable from "./components/EmailTable";

// type User = {
//  userId: string;
//   email: string;
// };
// type Email = {
//    id: string;
//   from?: string;
//   subject?: string;
//   snippet?: string;
//   body?: string;
//   date?: string;
//   userId?: string;
// };

// const App: React.FC = () => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [loading, setLoading] = useState(false);

// // Fetch users from backend                                   // checking
//   useEffect(() => {
//     fetch("https://localhost:7262/api/users/list")
//       .then((res) => res.json())
//       .then(setUsers);
//   }, []);

//   useEffect(() => {
//     if (!currentUser) return;
//     fetch(
//       `https://localhost:7262/api/emails?userId=${currentUser.userId}&email=${currentUser.email}`
//     )
//       .then((res) => res.json())
//       .then(setEmails);
//   }, [currentUser]);

//   // Current user check
//   useEffect(() => {
//     fetch("https://localhost:7262/api/auth/me", { credentials: "include" })
//       .then((res) => (res.ok ? res.json() : Promise.reject("Not logged in")))
//       .then((data) => setCurrentUser(data))
//       .catch(() => setCurrentUser(null));
//   }, []);

//   const handleLogin = () => {
//     window.location.href = "https://localhost:7262/api/auth/login";
//   };

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get<User[]>("https://localhost:7262/api/Users");
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);
// //fetch user by id           // checking
//  useEffect(() => {
//   if (!selectedUserId) {
//     setEmails([]);
//     return;
//   }

//   setLoading(true);

//   axios
//     .get<Email[]>(`https://localhost:7262/api/Users/inbox/${selectedUserId}`, {
//       withCredentials: true,
//     })
//     .then((res) => {

//       setEmails(Array.isArray(res.data) ? res.data : []);
//     })
//     .catch((err) => {
//       console.error("Error fetching emails:", err);
//       setEmails([]);
//     })
//     .finally(() => setLoading(false));
// }, [selectedUserId]);

//   return (
//   <>
//   {currentUser && (
//     <Navbar
//           users={users}
//           selectedUserId={selectedUserId}
//           setSelectedUserId={setSelectedUserId}
//           setCurrentUser={setCurrentUser}
//     />
//   )}

//   <div
//     className="container-fluid"
//     style={{ backgroundColor: "#bed8deff", minHeight: "100vh", paddingTop: "20px" }}
//   >
//     {!currentUser ? (
//       <LoginCard handleLogin={handleLogin} />
//     ) : (
//       <div>
//         {selectedUserId && (
//           <div className="shadow-sm">
//             <div
//               className="card-body d-flex justify-content-between align-items-center"
//               style={{ backgroundColor: "#baccc9ff" }}
//             >
//               <h4 className="card-title mb-3 text-center fw-bold text-dark p-2 rounded">
//                 Inbox for :- {users.find((u) => u.userId === selectedUserId)?.email}
//               </h4>

//               {!loading && emails.length === 0 && (
//                 <button
//                   onClick={() => setSelectedUserId(selectedUserId)}
//                   className="btn btn-info me-2 text-white"
//                 >
//                   Reload Emails
//                 </button>
//               )}
//             </div>

//           </div>
//         )}

//         {/* Show spinner while fetching */}
//         {loading && emails.length === 0 && (
//           <div className="d-flex justify-content-center align-items-center mt-3">
//             <div className="spinner-border text-primary me-2" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <span className="text-muted fw-bold">Loading emails...</span>
//           </div>
//         )}

//         {emails.length > 0 && <EmailTable emails={emails} userId={selectedUserId} />}

//         {!loading && emails.length === 0 && selectedUserId && (
//           <p className="text-muted text-center text-large">No emails found for this user.</p>
//         )}
//       </div>
//     )}
//   </div>
// </>

//   );
// };

// export default App;

// checking  perpose and  working fine
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

  useEffect(() => {
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

  // ------------------------ FETCH EMAILS WHEN SELECTED USER CHANGES ------------------------
  useEffect(() => {
    if (!selectedUserId) {
      setEmails([]);
      return;
    }

    const fetchEmails = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Email[]>(
          `https://localhost:7262/api/Users/inbox/${selectedUserId}`,
          {
            withCredentials: true,
          }
        );
        setEmails(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching emails:", err);
        setEmails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
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
                />
                <div className="container-fluid" style={{ backgroundColor: "#bed8deff", minHeight: "100vh", paddingTop: "20px" }}>
                   {selectedUserId ? (
                  loading ? (
                    <div style={{ textAlign: "center", marginTop: "20px " }}>
                      <span className="spinner-border text-primary me-2" role="status"></span>
                      <p>Loading email...</p>
                    </div>
                  ) : (
                    <EmailTable emails={emails} userId={selectedUserId} />
                  )
                ) : (
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <h4 className="text-center   text-danger fw-bold ">
                      Please select a dropdown-list...
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
