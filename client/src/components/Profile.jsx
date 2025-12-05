import { useSelector } from "react-redux";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    uname: user?.uname,
    email: user?.email,
    location: user?.location || "Oman"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // هنا تحطين تحديث قاعدة البيانات لو تبين
    console.log("Saved:", formData);
    setEditMode(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#e9f0ff",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      {/* =======================
          VIEW PROFILE
          ======================= */}
      {!editMode && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            Profile
          </h2>

          <div style={{ textAlign: "center" }}>
            <img
              src="https://img.icons8.com/ios/150/user-male-circle.png"
              alt="profile"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
            />
            <h3 style={{ marginTop: "15px" }}>{user?.uname}</h3>
          </div>

          {/* Edit Profile Button */}
          <div
            onClick={() => setEditMode(true)}
            style={{
              marginTop: "25px",
              backgroundColor: "#fff",
              padding: "12px 15px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <span>Edit Profile</span>
            <span>›</span>
          </div>

          {/* Readonly Inputs */}
          <label>Name</label>
          <input value={user?.uname} disabled style={inputStyle} />

          <label>Email</label>
          <input value={user?.email} disabled style={inputStyle} />

          <label>Location</label>
          <input
            value={user?.location || "Oman"}
            disabled
            style={inputStyle}
          />

          {/* Delete Account */}
          <button
            style={{
              marginTop: "30px",
              width: "100%",
              backgroundColor: "red",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Delete Account
          </button>
        </>
      )}

      {/* =======================
          EDIT PROFILE MODE
          ======================= */}
      {editMode && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Edit Profile
          </h2>

          <div style={{ textAlign: "center" }}>
            <img
              src="https://img.icons8.com/ios/150/user-male-circle.png"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              alt="profile"
            />
            <button style={picButtonStyle}>Change Profile Picture</button>
          </div>

          <label>Name</label>
          <input
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            style={inputStyle}
          />

          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25px"
            }}
          >
            <button
              style={cancelButton}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>

            <button style={saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const picButtonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#dce6ff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cancelButton = {
  width: "48%",
  backgroundColor: "#d9d9d9",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600"
};

const saveButton = {
  width: "48%",
  backgroundColor: "#2b63d9",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "600"
};

export default Profile;
