require('dotenv').config();

const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Get all contractors
app.get("/api/v1/contractors", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM contractors");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        contractors: results.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
})

// Get a contractor
app.get("/api/v1/contractors/:id", async (req, res) => {
  try {
    // Do not string concat queries - bad security! paramterize instead!
    const result = await db.query("SELECT name, location, price_range FROM contractors WHERE id = $1", [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        contractor: result.rows[0]
      }
    })
  } catch (err) {
    console.log(err);
  }
})

// Create a contractor
app.post("/api/v1/contractors", async (req, res) => {
  try {
    const {
      name,
      location,
      price_range
    } = req.body;

    const result = await db.query(`INSERT INTO contractors
                                  (name, location, price_range)
                                    VALUES
                                  ($1, $2, $3) RETURNING *`, [name, location, price_range])

    res.status(201).json({
      status: "success",
      data: {
        contractor: result.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Update a contractor
app.put("/api/v1/contractors/:id", async (req, res) => {
  try {
    const {
      name,
      location,
      price_range
    } = req.body;

    const result = await db.query(`UPDATE contractors SET
                                  name = $1, location = $2, price_range = $3
                                    WHERE
                                  id = $4 RETURNING *`, [name, location, price_range, req.params.id])
    res.status(200).json({
      status: "success",
      data: {
        contractor: result.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Delete a contractor
app.delete("/api/v1/contractors/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM contractors WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success"
    })
  } catch (err) {
    console.log(err);
  }

})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});