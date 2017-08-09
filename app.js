const express = require("express")
const app = express()

const mustacheExpress = require("mustache-express")
const path = require("path")
const pgp = require('pg-promise')()
const db = pgp({ database: 'robotDatabase'})
const query = 'SELECT * FROM robotDatabase'

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

app.engine("mst", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mst")


app.get("/", (req, res) => {
  // console.log(db.query());
  db.any(query).then(rows => {
    res.render('people', { robotDatabase: rows })
  })
})

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
