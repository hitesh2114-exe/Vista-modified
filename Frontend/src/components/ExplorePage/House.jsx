import React, { useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import "./House.css";
import Navbar from "../Commons/Navbar";
import Box from "@mui/material/Box";
import Bottom from "../Commons/Bottom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteHouse from "./DeleteHouse";
import AddReview from "../Review/AddReview";
import ShowReview from "../Review/ShowReview";
import ScrollToTop from "../../ScrollToTop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

function House() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [home, setHome] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`https://vista-modified-1.onrender.com/listing/${id}`);
      setHome(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://vista-modified-1.onrender.com/me", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    fetchListing();
  }, [id]);

  useEffect(() => {
    console.log(home);
  }, [home]);

  // useEffect(() => {
  //   console.log(user?._id);
  //   console.log(home?.owner?._id);
  // },[home,user]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://vista-modified-1.onrender.com/listing/delete/${home._id}`
      );
      console.log(response);
      navigate("/explore-page");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="house-outer-box">
        <div className="house-page">
          <button className="house-back-btn" onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
            Back
          </button>

          <section className="house-hero">
            <div className="house-hero-content">
              <p className="house-label">Premium stay</p>
              <h1>{home.title}</h1>
              <p className="house-location">
                {home.location}, {home.country}
              </p>

              <div className="house-highlights">
                <span>Entire home</span>
                <span>Self check-in</span>
                <span>Free cancellation</span>
              </div>
            </div>

            <div className="house-image-wrap">
              <img
                src={home?.image?.url}
                alt={home.title}
                className="house-image"
              />
            </div>
          </section>

          <section className="house-details-grid">
            <div className="house-main">
              <div className="house-section">
                <h2>About this place</h2>
                <p>{home.description}</p>
              </div>

              <div className="house-section">
                <h2>What this place offers</h2>

                <div className="house-amenities">
                  <div>
                    <strong>Comfort</strong>
                    <span>Air conditioning, cozy interiors</span>
                  </div>
                  <div>
                    <strong>Connectivity</strong>
                    <span>High-speed Wi-Fi available</span>
                  </div>
                  <div>
                    <strong>Location</strong>
                    <span>Close to local attractions</span>
                  </div>
                  <div>
                    <strong>Booking</strong>
                    <span>Instant confirmation available</span>
                  </div>
                </div>
              </div>

              <div className="house-section">
                <h2>Hosted by</h2>
                <div className="house-host">
                  <div className="house-host-avatar">
                    {home?.owner?.username?.charAt(0)?.toUpperCase() || "H"}
                  </div>
                  <div>
                    <strong>{home?.owner?.username || "Vista Host"}</strong>
                    <span>Verified host</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className="house-booking-card">
              <div className="house-price-row">
                <h3>₹{home.price}</h3>
                <span>/ night</span>
              </div>

              <div className="house-booking-box">
                <div>
                  <label>Check-in</label>
                  <span>Add date</span>
                </div>
                <div>
                  <label>Check-out</label>
                  <span>Add date</span>
                </div>
                <div>
                  <label>Guests</label>
                  <span>1 guest</span>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#65000B",
                  borderRadius: "0.8rem",
                  padding: "0.9rem",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#4f0008",
                  },
                }}
              >
                Reserve now
              </Button>

              <p className="house-note">You will not be charged yet</p>

              <div className="house-total">
                <span>Total before taxes</span>
                <strong>₹{home.price}</strong>
              </div>

              {user?._id === home?.owner?._id && (
                <div className="house-actions">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit/${home._id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setShowConfirm(true)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </aside>
          </section>

          {showConfirm && (
            <DeleteHouse
              id={id}
              onClose={() => setShowConfirm(false)}
              onDelete={handleDelete}
            />
          )}
        </div>
        <AddReview listingId={id} refreshListing={fetchListing} />
        <ShowReview
          reviews={home.reviews}
          id={home._id}
          refreshListing={fetchListing}
        />
      </div>

      <Bottom />
    </>
  );
}

export default House;
