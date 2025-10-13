/* eslint-disable react-hooks/rules-of-hooks */
                                            // this  is fully working code
// import React from "react";
// import axios from "axios";

// interface User {
//   userId: string;
//   email: string;
// }
// interface NavbarProps {
//   users: User[];
//   selectedUserId: string | null;

//   setSelectedUserId: (id: string) => void;
//   setCurrentUser: (user: User | null) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({
//   users,
//   selectedUserId,
//   setSelectedUserId,
//   setCurrentUser,
// }) => {
//   const handleLogout = async () => {
//     try {
//       await axios.get("https://localhost:7262/api/auth/logout", {
//         withCredentials: true,
//       });
//     console.log("Are you sure you want to logout");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//     }
//   };

//   const handleLogin = () => {
//     window.location.href = "https://localhost:7262/api/auth/login";
//   };

//   return (
// //     <nav
// //       className="navbar navbar-expand-lg  shadow-sm px-4 py-2"
// //       style={{ background: "linear-gradient(to right, #202c2c, #1a1f1f)" }}
// //     >
// //       <div className="container-fluid d-flex justify-content-between align-items-center">
// //         <div className="d-flex align-items-center">
// //           <span className="navbar-brand mb-0 h1 text-white">Gmail Client</span>

// //           <select
// //             className="form-select ms-3"
// //             value={selectedUserId || ""}
// //             onChange={(e) => setSelectedUserId(e.target.value)}
// //           >
// //             <option value="" className="text-muted">
// //               Select Gmail User
// //             </option>
// //             {users.map((user) => (
// //               <option key={user.userId} value={user.userId}>
// //                 {user.email}
// //               </option>
// //             ))}
// //           </select>
          

          
// //     {/* Center: Google Login Button */}
// //     <div className="d-flex justify-content-center flex-grow-1">
// //       <button
// //   onClick={handleLogin}
// //   className="btn btn-danger fs-5"
// //   style={{ height: "50px" }}
// // >
// //         <i className="bi bi-google "></i> Login with Google
// //       </button>
// //     </div>

// //         </div>

// //         <button className="btn btn-danger" onClick={handleLogout}>
// //           Logout
// //         </button>
// //       </div>
// //     </nav>
// <nav
//   className="navbar shadow-sm px-4 py-2"
//   style={{ background: "linear-gradient(to right, #202c2c, #1a1f1f)" }}
// >
//   <div className="container-fluid d-flex align-items-center">
    
//     <div className="d-flex align-items-center">
//       <span className="navbar-brand mb-0 h1 text-white">Gmail Client</span>
//       <select
//         className="form-select ms-3"
//         value={selectedUserId || ""}
//         onChange={(e) => setSelectedUserId(e.target.value)}
//         style={{ height: "48px" }} 
//       >
//         <option value="" className="text-muted">Select Gmail User</option>
//         {users.map((user) => (
//           <option key={user.userId} value={user.userId}>{user.email}</option>
//         ))}
//       </select>
//     </div>
//     <div className="flex-grow-1 d-flex justify-content p-2">
//       <button
//         onClick={handleLogin}
//         className="btn btn-primary fs-5"
//         style={{ height: "48px" }} 
//       >
//         <i className="bi bi-google me-2 fs-5"></i> Login with Google
//       </button>
      
//     </div>
//     <div>
//       <button
//         className="btn btn-danger"
//         onClick={handleLogout}
//         style={{ height: "48px" }} 
//       >
//         Logout
//       </button>
//     </div>

//   </div>
// </nav>

//   );
// };

// export default Navbar;



                                        // testing code end here
import axios from "axios";
import React from "react";
interface User {
  userId: string;
  email: string;
}

interface NavbarProps {
  users: User[];
  selectedUserId: string | null;
  setSelectedUserId: (id: string) => void;
  setCurrentUser: (user: User | null) => void;
  onRefreshInbox: (userId: string | null) => void;  // new prop for refresh function
}

const Navbar: React.FC<NavbarProps> = ({
  users,
  selectedUserId,
  setSelectedUserId,
  setCurrentUser,
   onRefreshInbox,
  
}) => {
  
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };


  const handleLogout = async () => {
    try {
      await axios.get("https://localhost:7262/api/auth/logout", { withCredentials: true });
    } catch (err) {
      console.error(err);
    } finally {
       localStorage.removeItem("accessToken"); // agar token local storage me store kar rahe ho to use remove karo
      localStorage.clear();                    // agar koi aur data local storage me hai to wo bhi clear kar do
      window.location.href = "/login";       
    }
  };

  const handleLogin = () => {
    window.location.href = "https://localhost:7262/api/auth/login";
  };

  return (
    <nav className="navbar shadow-sm px-4 py-2" style={{ background: "linear-gradient(to right, #202c2c, #1a1f1f)" }}>
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
          <span className="navbar-brand mb-0 h1 text-white">Gmail Client</span>
          <select
            className="form-select ms-3"
            value={selectedUserId || ""}
            onChange={(e) => handleUserSelect(e.target.value)}
            style={{ height: "48px" }}
          >
            <option value="" className="text-muted">Select Gmail User</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>{user.email}</option>
            ))}
          </select>
        </div>

        <div className="flex-grow-1 d-flex p-2">
          <button onClick={handleLogin} className="btn btn-outline-danger fs-5" style={{ height: "48px" }}>
            <i className="bi bi-google me-2 fs-5"></i> Sign-in with Google
          </button>
        </div>

        <div>
          <button
            className="btn btn-info me-2 text-white p-2"
            style={{ height: "48px" }}
            onClick={() => onRefreshInbox(selectedUserId)} // ✅ Refresh inbox here
          >
            <i className="fa-solid fa-rotate"></i> Inbox Refresh
          </button>
          <button className="btn btn-danger" onClick={handleLogout} style={{ height: "48px" }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
