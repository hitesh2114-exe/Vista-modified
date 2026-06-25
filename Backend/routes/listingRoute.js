const express = require("express");
const listingRouter = express.Router();
const Listing = require("../model/listing");
const listing = require("../controllers/listingControllers");
const { isLoggedIn } = require("../middleware");

console.log(isLoggedIn);

listingRouter.get("/listing/all", listing.index);
listingRouter.get("/listing/:id", listing.show);
listingRouter.post("/listing/create", isLoggedIn, listing.createListing);
listingRouter.put("/listing/update", isLoggedIn, listing.editListing);
listingRouter.delete("/listing/delete/:id", isLoggedIn, listing.deleteListing);

module.exports = listingRouter;
