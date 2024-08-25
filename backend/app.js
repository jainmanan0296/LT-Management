const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./src/routes/UserRoutes");
const roomRouter = require("./src/routes/RoomRoutes");
const bookingRouter = require("./src/routes/BookingsRoute");
require("dotenv").config();
const cors = require("cors");
const seedDB = require("./seed");
const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

console.log(process.env.MONDODB_URL);
const port = process.env.PORT || 4000;
// console.log(process.env.MONGODB_URI);
async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


main()
  .then(() => console.log("MongoDB connection successful."))
  .catch(console.log);


app.use(express.json());
//seedDB();
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/users", userRouter);

app.use("/api/rooms", roomRouter);

app.use("/api/bookings", bookingRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});


