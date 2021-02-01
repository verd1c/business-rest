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

// Business
app.get('/business', queries.getAllBusinesses);
app.get('/business/:id');

app.post('/business', queries.createBusiness);

app.put('/business/:id', queries.updateBusiness);

app.delete('/business/:id');

// Staff
app.get('/business/:id/staff', queries.getBusinessStaff); // Get all staff by business ID
app.get('/business/:id/staff/:staff_id');
app.get('/staff/:staff_id');

app.post('/business/:id/staff');

app.put('/business/:id/staff/:staff_id');
app.put('/staff/:staff_id');

app.delete('business/:id/staff/:staff_id');
app.delete('staff/:staff_id');

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});