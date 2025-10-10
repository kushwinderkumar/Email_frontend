
// uncompete

// import React, { useState, useEffect } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import EmailTable from "./EmailTable";
// import { Email } from "../services/outlookService";

// interface LoginCardProps {
//   handleLogin: () => void;
// }

// const LoginCard: React.FC<LoginCardProps> = ({ handleLogin }) => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchEmails = async (userId: string, token: string) => {
//     if (!userId || !token) return;
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/Users/inbox${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch emails: ${response.status}`);
//       }

//       const data = await response.json();
//       setEmails(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {

//       const urlParams = new URLSearchParams(window.location.search);
//       const uid = urlParams.get("userId");
//       if (!uid) return;
//       setUserId(uid);
//       const tokenRes = await fetch(`/auth/outlook/token/${uid}`);
//       const tokenData = await tokenRes.json();
//       const token = tokenData.accessToken;

//       await fetchEmails(uid, token);
//     };

//     init();
//   }, []);

//   return (
//     <div
//       className="d-flex w-100 justify-content-center align-items-center"
//       style={{
//         height: "100vh",
//         width: "100vw",
//         backgroundImage: 'url("login.jpg")',
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className="card shadow-lg p-5 border-0"
//         style={{
//           width: "450px",
//           borderRadius: "20px",
//           backgroundColor: "#e0edeeff",
//         }}
//       >
//         <h2 className="text-center mb-4 fw-bold text-primary">Welcome</h2>
//         <p className="text-muted text-center mb-4 text-white">
//           Please login with your account
//         </p>

//         <button
//           onClick={handleLogin}
//           className="btn btn-danger w-100 m-1 fs-5"
//         >
//           <i className="bi bi-google mr-2 py-2 fs-5"></i> Login with Google
//         </button>

//         <button
//           className="btn btn-primary w-100 mt-2"
//           onClick={() => (window.location.href = "/auth/outlook")}
//         >
//            <i className="bi bi-microsoft m-2"></i>  Login with Outlook
//         </button>

//         {loading && <p className="mt-3">Loading emails...</p>}
//         {emails.length > 0 && <EmailTable emails={emails} />}
//       </div>
//     </div>
//   );
// };

// export default LoginCard;
                                                    //checking

// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useState } from "react";


// interface LoginCardProps {
//   handleLogin: (username: string, password: string) => void;
// }

// const LoginCard: React.FC<LoginCardProps> = ({ handleLogin }) => {

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const onSubmit=(e: React.FormEvent)=>{
//     e.preventDefault();
//     handleLogin(username,password); 
//   };

//   return (
//     <div
//   className="d-flex justify-content-center align-items-center"
//   style={{
//     height: "100vh",
//     width: "100vw",
//     backgroundImage: 'url("login.jpg")',
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// >
//   <div className="card shadow-lg p-4" style={{ width: "800px", borderRadius: "15px" }}>
//     <div className="row g-0">
//       {/* Left side - Login form */}
//       <div className="col-md-7 p-4 bg-white rounded-start">
//         <h3 className="text-center fw-bold mb-4">Login</h3>
//         <form onSubmit={onSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3 position-relative">
//             <label className="form-label fw-semibold">Password</label>
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="input-group-text"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
//               </span>
//             </div>
//           </div>

//           <div className="d-grid mt-4">
//             <button type="submit" className="btn btn-primary fw-bold">
//               Login
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Right side - Registration link */}
//       <div
//         className="col-md-5 d-flex flex-column justify-content-center align-items-center text-center p-4 text-white style ={{ backgroundColor: '#cdb8e3ff' }}"
//         style={{
//           background: "linear-gradient(135deg, #7f42c0ff 0%, #2575fc 100%)",
//           borderRadius: "0 15px 15px 0",
//         }}
//       >
//         <h4 className="fw-bold mb-3">New here?</h4>
//         <p className="mb-4">Create an account and join our platform !</p>
//         <a href="/register" className="btn btn-outline-light fw-bold">
//           New Registration
//         </a>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default LoginCard;

import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { loginUser } from "../services/Auth";
import Swal from "sweetalert2";

interface LoginCardProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginCard: React.FC<LoginCardProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
   
 const handleLogins = async (username: string, password: string) => {
  try {
    const response = await loginUser({ userName: username, userPassword: password });

    const token = response?.data?.token;
    if (!token) {
      throw new Error("Token not received from server");
    }
    localStorage.setItem("Token", token); // previous code
  

   await Swal.fire({
    icon:'success',
    title:'Login Successful',
    text:'You have logged in successfully !!',
    timer:2000,
     showConfirmButton: false, 
   })
    window.location.href = "/";
  } catch (error: any) {
    console.error("Login Error:", error);
    if (error.response) {
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response.data || "Invalid credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (error.request) {
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: "No response from server",
        timer: 3000
      });
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || "Login failed",
        timer: 3500,
      });
    }
  }
};
  const validate = () => {
    const newErrors = { username: "", password: "" };

    
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!username.trim()) newErrors.username = "UserName is required";
    else if (!gmailRegex.test(username)) newErrors.username = "Enter a valid UserName";

  
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (!validationErrors.username && !validationErrors.password) {
      handleLogins(username, password);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("login.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "800px", borderRadius: "15px" }}>
        <div className="row g-0">
          {/* Left side - Login form */}
          <div className="col-md-7 p-4 bg-white rounded-start">
            <h3 className="text-center fw-bold mb-4">Login</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

             <div className="mb-3 position-relative">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </span>
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>
              </div> 

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary fw-bold">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div
            className="col-md-5 d-flex flex-column justify-content-center align-items-center text-center text-white p-4"
            style={{
              background: "linear-gradient(135deg, #7f42c0ff 0%, #2575fc 100%)",
              borderRadius: "0 15px 15px 0",
            }}
          >
            <h4 className="fw-bold mb-3">New here?</h4>
            <p className="mb-4">Create an account and join our platform!</p>
            <a href="/register" className="btn btn-outline-light fw-bold">
              New Registration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;


