// const data = require("./data.js")
const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const path = require("path")
const pgp = require('pg-promise')()
const db = pgp('postgres://localhost:3000/robotDatabase')

//CREATE TABLE robotDatabase (“username” VARCHAR(100) NOT NULL, “imageurl” VARCHAR(100) NULL, “email” VARCHAR(100) NULL, “university” VARCHAR(100) NULL, “street_number” VARCHAR(100) NULL, “address” VARCHAR(100) NULL, “city” VARCHAR(100) NULL, “state” VARCHAR(100) NULL, “job” VARCHAR(100) NULL, “company” VARCHAR(100) NULL, “postal_code” VARCHAR(100) NULL, “year_built” VARCHAR(100) NULL, “next_service_date” VARCHAR(100) NULL, “is_active” VARCHAR(100) NULL);

app.use(express.static("public"))

app.engine("mst", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mst")
//
// const ul = document.querySelector('ul')
// const details = document.querySelector('.details')

app.get("/people", (req, res) => {
  console.log('hey there');
  // replace with sql
  db.any('SELECT id, username FROM db')
    .then((data) => {
      res.json(data)
    })
})

// const getId = parseInt(req.params.id)
// const oneUser = data.users.find(user => user.id === getId)
// res.render("people", oneUser)

app.get('/people/:id', (req,res) => {
  const id = req.params.id
  db.oneOrNone('SELECT * FROM db WHERE id = $1', [id])
  .then((data) => {
    res.json(data)
  })
})

app.listen(3000, () => {
  console.log("listening")
})
