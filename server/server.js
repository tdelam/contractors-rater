require('dotenv').config();

const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* Lists contractors
* @param req
* @param res
* @returns Contractors | error
*/
app.get("/api/v1/contractors", async (req, res) => {
  try {
    const results = await db.query(
      "select * from contractors left join (select contractor_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by contractor_id) reviews on contractors.id = reviews.contractor_id;"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      contractors: results.rows
    });
  } catch (err) {
    return res.status(500).json({ message: 'There was an error getting contractors.' })
  }
})

/* Gets a contractor
* @param req { params: id }
* @param res
* @returns Contractor | error
*/
app.get("/api/v1/contractors/:id", async (req, res) => {
  try {
    const result = await db.query(
      "select * from contractors left join (select contractor_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by contractor_id) reviews on contractors.id = reviews.contractor_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE contractor_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      contractor: result.rows[0],
      reviews: reviews.rows,
    })
  } catch (err) {
    return res.status(500).json({ message: 'There was an error getting contractor.' })
  }
})

/* Creates a contractor
* @param req
* @param res
* @returns Contractor | error
*/
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
      contractor: result.rows[0]
    })
  } catch (err) {
    return res.status(500).json({ message: 'There was an error creating contractor.' })
  }
})

/* Update a contractor
* @param req { params: id }
* @param res
* @returns Updated contractor | error
*/
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
      contractor: result.rows[0]
    })
  } catch (err) {
    return res.status(500).json({ message: 'There was an error updating contractor.' })
  }
})

/**
 * Delete a contractor
 * @param {*} req
 * @param {*} res
 * @return success | error
 */
app.delete("/api/v1/contractors/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM contractors WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success"
    })
  } catch (err) {
    return res.status(500).json({ message: 'There was an error deleting the contractor.' })
  }

})

/**
 * Add a review
 * @param {*} req
 * @param {*} res
 * @return success | error
 */
app.post("/api/v1/contractors/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (contractor_id, name, content, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.content, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});