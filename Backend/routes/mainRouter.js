const express = require("express");
const mainRouter = express.Router();
const listingRouter = require("./listingRoute");
const userRouter = require("./userRoute");
const reviewRouter = require("./reviewRoute");

mainRouter.use(listingRouter);
mainRouter.use(userRouter);
mainRouter.use(reviewRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRouter;
