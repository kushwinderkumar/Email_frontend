/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { registerUser } from "../services/Auth";
import Swal from "sweetalert2";
const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async (formData: { name: string; email: string; password: string }) => {
    try {
        const response = await registerUser({ userName: formData.email, userPassword: formData.password });
        await Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have been registered successfully!',
            timer: 2000
        });
        window.location.href = "/login";
    } catch (error) {
        console.error("Registration error:", error);
        await Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Registration failed!',
            timer: 2000
        });
    }
  }
  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
    if (!formData.name.trim()) newErrors.name = "Name is required";
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!formData.email.trim()) newErrors.email = "UserName is required";
    else if (!gmailRegex.test(formData.email)) newErrors.email = "Enter a valid UserName address";
    if (!formData.password.trim()) newErrors.password = "UserPassword is required";
    else if (formData.password.length < 6) newErrors.password = " UserPassword must be at least 6 characters";
    return newErrors;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      handleRegister(formData);
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
          {/* Left side - Registration form */}
          <div className="col-md-7 p-4 bg-white rounded-start">
            <h3 className="text-center fw-bold mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder=""
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

             <div className="mb-3 position-relative">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder=""
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  Register
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Info panel */}
          <div
            className="col-md-5 d-flex flex-column justify-content-center align-items-center text-center text-white p-4"
            style={{
              background: "linear-gradient(135deg, #7f42c0ff 0%, #2575fc 100%)",
              borderRadius: "0 15px 15px 0",
            }}
          >
            <h4 className="fw-bold mb-3">Already have an account?</h4>
            <p className="mb-4">Go to login and access your account!</p>
            <a href="/login" className="btn btn-outline-light fw-bold">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

