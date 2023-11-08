const express = require('express');
const apiRoutes = require('../backend/app/route/registerRoute');
const app = express();
const cors=require('cors');
const mongoose = require('mongoose');
const port = 8080;
mongoose.connect('mongodb://localhost/formData');
app.use(cors())
app.use(express.json())
// Define a list of predefined stocks
app.use(apiRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
