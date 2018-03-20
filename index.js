'use strict';

const app = require('./app');

app.listen(process.env.PORT, () => {
    console.info(`Server is listening on http://localhost:${process.env.PORT}`);
});
