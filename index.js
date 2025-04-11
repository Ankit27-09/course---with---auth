const express = require("express");
const {adminRoutes} = require("./routes/adminRoutes");
const {userRoutes} = require("./routes/userRoutes");

const app = express();

app.use(express.json());
const port = 3000;

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


app.listen(port, (req, res) => {
    console.log("server is listening on port 3000");
})
