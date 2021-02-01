const express = require('express');
const bodyParser = require('body-parser');
const queries = require('./queries');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({
        info: 'A Rest API implementation for bussinesses'
    });
});
app.get('/business', queries.getAllBusinesses);
app.post('/business', queries.createBusiness);
app.put('/business/:id', queries.updateBusiness);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});