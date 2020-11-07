require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Get all contractors
app.get("/api/v1/contractors", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      contractors: [
        'Contractor 1',
        'Contractor 2',
        'Contractor 3',
      ]
    }
  })
})

// Get a contractor
app.get("/api/v1/contractors/:id", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    data: {
      contractor: {
        name: "Ladders",
        location: "Vancouver",
        price_range: 2,
      }
    }
  })
})

// Create a contractor
app.post("/api/v1/contractors", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      contractor: {
        name: "Contractors Inc.",
        location: "Hamilton",
        price_range: 1,
      }
    }
  })
})

// Update a contractor
app.put("/api/v1/contractors/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      contractor: {
        name: "Contractors 2 Inc.",
        location: "Niagara Falls",
        price_range: 2,
      }
    }
  })
})

// Delete a contractor
app.delete("/api/v1/contractors/:id", (req, res) => {
  res.status(204).json({status: "success"})
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});