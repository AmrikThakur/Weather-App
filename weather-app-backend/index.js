const express = require('express')
const app = express();

require('./startup/prod')(app);
require('./startup/routes')(app);

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})