import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../features/UserSlice";


const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    uname: user?.uname,
    email: user?.email,
    location: user?.location || "Oman",
    lat: user?.lat || null,
    lng: user?.lng || null
  });

  // Handle input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save to backend + redux
  const handleSave = () => {
    dispatch(updateProfile({ id: user._id, data: formData }));
    setEditMode(false);
  };

  // Get live GPS location
  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setFormData({
        ...formData,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        location: `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`
      });
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#e9f0ff",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      {/* ===================== VIEW MODE ===================== */}
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

          {/* Delete */}
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

      {/* ===================== EDIT MODE ===================== */}
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

          <label>Location Text</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* 📍 BUTTON: USE MY LOCATION */}
          <button
            onClick={handleUseMyLocation}
            style={{
              padding: "10px",
              backgroundColor: "#2b63d9",
              width: "100%",
              color: "white",
              borderRadius: "8px",
              border: "none",
              marginBottom: "15px",
              marginTop: "8px"
            }}
          >
            Use My Current Location
          </button>

          {/* 🌍 GOOGLE MAPS VIEW */}
          {formData.lat && formData.lng && (
            <>
              <label>Your Location on Map</label>
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "15px"
                }}
              >
                <iframe
                  title="map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${formData.lat},${formData.lng}&z=15&output=embed`}
                  loading="lazy"
                ></iframe>
              </div>
            </>
          )}

          {/* SAVE / CANCEL */}
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
