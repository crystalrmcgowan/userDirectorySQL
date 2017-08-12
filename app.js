const express = require("express")
const app = express()

const mustacheExpress = require("mustache-express")
const path = require("path")
const pgp = require("pg-promise")()
const database = pgp({ database: "robotDatabase" })
const query = "SELECT * FROM robotDatabase"

// CREATE TABLE robotDatabase (
// "id" SERIAL PRIMARY KEY,
// "username" VARCHAR(100) NOT NULL,
// "imageurl" VARCHAR(100) NULL,
// "email" VARCHAR(100) NULL,
// "university" VARCHAR(100) NULL,
// "street_number" VARCHAR(100) NULL,
// "address" VARCHAR(100) NULL,
// "city" VARCHAR(100) NULL,
// "state" VARCHAR(100) NULL,
// "job" VARCHAR(100) NULL,
// "company" VARCHAR(100) NULL,
// "postal_code" VARCHAR(100) NULL,
// "year_built" VARCHAR(100) NULL,
// "next_service_date" VARCHAR(100) NULL,
// "is_active" VARCHAR(100) NULL);

app.use(express.static("public"))

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.get("/", function(req, res) {
  database.any(query).then(rows => {
    res.render("people", { users: rows })
  })
})

app.get("/users/:id", (req, res) => {
  database.any(query).then(rows => {
    const userID = parseInt(req.params.id)
    const myUser = rows.find(user => {
      return user.id === userID
    })
    res.render("todo", myUser)
  })
})

// Create New Robot
app.post("/add", (req, res) => {
  let newUser = {
    id: rows.length + 1,
    username: req.body.robotUsername,
    imageurl: req.body.imageurl,
    email: req.body.robotEmail,
    university: req.body.robotUniversity,
    street_number: req.body.robotStreetNumber,
    address: req.body.robotAddress,
    city: req.body.robotCity,
    state: req.body.robotState,
    job: req.body.robotJob,
    company: req.body.robotCompany,
    postal_code: req.body.robotPostalCode
  }
  rows.push(newUser)
  res.redirect("/", { users: rows })
})

app.delete("/users/:id", (req, res) => {
  const userID = parseInt(req.params.id)
  allRobots = allRobots.filter(bot => bot.id !== robotID)
  res.render("/", { users: rows })
})

app.listen(3000, () => {
  console.log("listening")
})
