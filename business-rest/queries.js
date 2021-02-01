const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'business',
    password: 'password',
    port: 5432,
});

const types = ["bar", "restaurant", "club", "hotel", "cafe"];

const getAllBusinesses = (request, response) => {
    // Get all businesses
    pool.query('SELECT * FROM businesses;', (error, results) => {
        if(error)
            console.log('AXaxaxaxaxa');

        response.status(200).json(results.rows);
    });
};

/**
 * Creates a business given the name, location and type
 * 
 * The type of business can be empty
 */
const createBusiness = (request, response) => {
    const { name, location, type } = request.body;

    // Check if business type is supported
    if(!types.includes(type.toLowerCase)){
        response.status(400).json({
            info: 'Business type ' + type + ' is not supported.',
        });
        return;
    }

    // Create new business
    pool.query('INSERT INTO businesses (name, location, type) VALUES ($1, $2, $3);', [name, location, type.toLowerCase()], (error, results) => {
        if(error)
            console.log(erorr);
        
        response.status(201).json({
            info: 'Created business ' + name + ' successfully.',
        });
    });
};

/**
 * Update a business using it's business_id
 * 
 * At least one of the arguments (name, location, type) must be passed and type has to be supported
 */
const updateBusiness = (request, response) => {
    const business_id = parseInt(request.params.id);
    const { name, location, type } = request.body;

    // Check if id wasn't given
    if(business_id == undefined || isNaN(business_id)){
        response.status(400).json({
            info: 'Argument business_id missing.',
        });
        return;
    }

    // Check if nothing was parsed to update
    if(name == undefined && location == undefined && type == undefined){
        response.status(400).json({
            info: 'Nothing was parsed to update.',
        });
        return;
    }

    // Check if a type change request was given but the type is wrong
    if(type != undefined && !types.includes(type.toLowerCase())){
        response.status(400).json({
            info: 'Business type ' + type + ' is not supported.',
        });
        return;
    }

    // Build query
    var query = "UPDATE businesses SET";
    if(name != undefined) query += " name = '" + name + "',";
    if(location != undefined) query += " location = '" + location + "',";
    if(type != undefined) query += " type = '" + type.toLowerCase() + "',";
    query = query.slice(0, -1); // Cut off last comma
    query += " WHERE business_id = " + business_id + ";";

    pool.query(query, (error, results) => {
        if(error){
            console.log('AAaaa');
        }
        
        response.status(200).send(`Business with ID: ${business_id} modified successfully`);
    });
};

/**
 * 
 */
const deleteBusiness = (request, response) => {

};

const getBusinessStaff = (request, response) => {

};

// API
module.exports = {
    getAllBusinesses,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessStaff,
};