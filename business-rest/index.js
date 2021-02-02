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

// Base
app.get('/', (request, response) => {
    response.json({
        info: 'A Rest API implementation for bussinesses'
    });
});

// ~ Endpoints

// Business
app.get('/business', queries.getAllBusinesses);
app.get('/business/:id', queries.getBusiness);
app.post('/business', queries.createBusiness);
app.put('/business/:id', queries.updateBusiness);
app.delete('/business/:id', queries.deleteBusiness);

// Staff
app.get('/business/:id/staff', queries.getBusinessStaff); // Get all staff by business ID
//app.get('/business/:id/staff/:staff_id', queries.getStaffMember);
app.get('/staff/:staff_id', queries.getStaffMember);
app.post('/business/:id/staff', queries.createStaff);
//app.put('/business/:id/staff/:staff_id');
app.put('/staff/:staff_id', queries.updateStaff);
//app.delete('business/:id/staff/:staff_id');
app.delete('staff/:staff_id', queries.deleteStaff);

// Server listener
app.listen(port, () => {
    console.log(`REST API running on port ${port} using ${queries.connection.database}:${queries.connection.user}:${queries.connection.password}@${queries.connection.host}:${queries.connection.port}`);
});