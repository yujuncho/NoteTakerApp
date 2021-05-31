const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const htmlController = require("./controllers/htmlController");
const apiController = require("./controllers/apiController");

// Gotcha: the order matters. If I put apiController after
// the htmlController, the catch all for index.html will
// be matched before anything in apiController is matched
apiController(app);
htmlController(app);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
