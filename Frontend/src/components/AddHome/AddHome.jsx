import React, { useState } from "react";
import "./AddHome.css";
import Navbar from "../Commons/Navbar";
import Bottom from "../Commons/Bottom";
import image from "../../public/hero-image-4.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: "",
    image: {
      filename: "Random",
      url: "",
    },
  });
  const [loginMsg, setLoginMsg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        url: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData };

      if (!data.image.url) {
        delete data.image;
      }

      const response = await axios.post(
        "https://vista-modified-1.onrender.com/listing/create",
        data,
        {
          withCredentials: true,
        }
      );
      setLoginMsg(false);
      navigate("/explore-page");
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginMsg(true);
      }
      // console.error(error.response);
    }
  };

  useEffect(() => {
    console.log(loginMsg);
  }, [loginMsg]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.9rem",
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#65000B",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#65000B",
    },
  };

  return (
    <>
      <Navbar />
      {loginMsg && (
        <Alert
          severity="error"
          sx={{ position: "absolute", top: "5rem", left: "39%", zIndex: "1" }}
        >
          You need to login first! Click here to{" "}
          <Link
            to={`/login`}
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (location.pathname !== "/login") {
                localStorage.setItem(
                  "postLoginRedirect",
                  location.pathname + location.search
                );
              }
            }}
          >
            Login
          </Link>
        </Alert>
      )}

      {/* <Alert
          severity="error"
          sx={{ position: "absolute", top: "5rem", left: "43%", zIndex: "1" }}
        >
          You need to login first!
        </Alert> */}

      <main className="add-home-outer-box">
        <section className="add-home-page">
          <div className="add-home-visual">
            <img src={image} />

            <div className="add-home-visual-content">
              <p>Vista hosting</p>
              <h1>Add your home</h1>
              <span>
                Share your place with guests looking for memorable stays.
              </span>
            </div>
          </div>

          <div className="add-home-card">
            <div className="add-home-header">
              <p className="add-home-label">Create listing</p>
              <h2>Tell guests about your place</h2>
            </div>

            <form onSubmit={handleSubmit} className="add-home-form">
              <TextField
                name="title"
                label="Listing title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <TextField
                name="description"
                label="Description"
                value={formData.description}
                multiline
                rows={5}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <div className="add-home-two-fields">
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />

                <TextField
                  name="country"
                  label="Country"
                  value={formData.country}
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />
              </div>

              <div className="add-home-two-fields">
                <TextField
                  name="price"
                  label="Price per night"
                  type="number"
                  variant="outlined"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />

                <TextField
                  label="Image URL"
                  name="image"
                  value={formData.image.url}
                  variant="outlined"
                  onChange={handleImageChange}
                  fullWidth
                  sx={inputStyle}
                />
              </div>

              {formData.image.url && (
                <div className="add-home-preview">
                  <img src={formData.image.url} alt="Listing preview" />
                </div>
              )}

              <div className="add-home-footer">
                <p>You can edit listing details after publishing.</p>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#65000B",
                    borderRadius: "0.8rem",
                    padding: "0.85rem 1.5rem",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#4f0008",
                    },
                  }}
                >
                  Add Home
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Bottom />
    </>
  );
}

export default AddHome;
