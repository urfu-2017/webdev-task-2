'use strict';

const app = require('./app');

app.listen(process.env.PORT, () => {
    console.info(`Server is listening on ${process.env.PORT} PORT`);
});
