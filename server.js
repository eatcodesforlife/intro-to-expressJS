const express = require("express");
const path = require("path");
const app = express();
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const users = require("./Users");
// const path = require("path");

// init middleware
// app.use(logger);

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

// rendering template - handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Users App",
    users,
  })
);

// body parser middleware
app.use(express.json());
// for form submissions
app.use(express.urlencoded({ extended: false }));

// user api route
app.use("/api/users", require("./routes/api/users"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
