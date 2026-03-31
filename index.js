const express = require('express');
const app = express();
const PORT = 3001;

// This line tells Express to serve any file inside the "public" folder
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`⚡ CryPTrus 2.0- UI is live at http://localhost:${PORT}`);
});

