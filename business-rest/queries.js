const { connection, businessTypes, staffTypes } = require('./config');
const Pool = require('pg').Pool;
const pool = new Pool(connection);

/**
 * Get all businesses
 */
const getAllBusinesses = (request, response) => {
    // Get all businesses
    pool.query('SELECT * FROM businesses;', (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

        response.status(200).json(results.rows);
    });
};

/**
 * Get business with given ID
 */
const getBusiness = (request, response) => {
    const business_id = parseInt(request.params.id);

     // Check if id wasn't given
    if(business_id == undefined || isNaN(business_id)){
        response.status(400).send('Argument business_id missing');
        return;
    }

    // Get business
    pool.query('SELECT * FROM businesses WHERE business_id = $1;', [business_id], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

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
    if(!businessTypes.includes(type.toLowerCase())){
        response.status(400).json({
            info: 'Business type ' + type + ' is not supported.',
        });
        return;
    }

    // Create new business
    pool.query('INSERT INTO businesses (name, location, type) VALUES ($1, $2, $3);', [name, location, type.toLowerCase()], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }
        
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
    if(type != undefined && !businessTypes.includes(type.toLowerCase())){
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
            response.status(500).send(`Internal Server Error`);
            return;
        }
        
        response.status(200).send(`Business with ID: ${business_id} modified successfully`);
    });
};

/**
 * Delete business with given ID
 */
const deleteBusiness = (request, response) => {
    const business_id = parseInt(request.params.id);

    // Check if id wasn't given
    if(business_id == undefined || isNaN(business_id)){
        response.status(400).send('Argument business_id missing');
        return;
    }

    // Delete business
    pool.query('DELETE FROM businesses WHERE business_id = $1;', [business_id], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

        response.status(200).send(`Business with ID: ${business_id} deleted successfully`);
    });
};

/**
 * Fetches all staff members for given business
 */
const getBusinessStaff = (request, response) => {
    const business_id = parseInt(request.params.id);

    pool.query('SELECT * FROM staff WHERE business_id = $1;', [business_id], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

        response.status(200).json(results.rows);
    });
};

/**
 * Fetches a staff memeber given the staff id
 */
const getStaffMember = (request, response) => {
    const staff_id = parseInt(request.params.staff_id);

    // Only the staff ID is really required
    if(!staff_id || isNaN(staff_id)){
        response.status(400).json({
            bad_arguments: 'staff_id'
        });
        return;
    }

    // Get staff member
    pool.query('SELECT * FROM staff WHERE staff_id = $1;', [staff_id], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

        response.status(200).json(results.rows);
    });
};

/**
 * Create staff member for given business
 */
const createStaff = (request, response) => {
    const business_id = parseInt(request.params.id);
    const { email, first_name, last_name, position, phone_number } = request.body;

    // Check for missing or malformed arguments
    if(!email || !first_name || !last_name || !position || !isEmail(email) || !staffTypes.includes(position.toLowerCase()) || !business_id || isNaN(business_id)){
        var res = {};

        // Check for missing args
        var missing_arguments = "";
        if(!email) 
            missing_arguments += "email, ";
        if(!first_name) 
            missing_arguments += "first_name, ";
        if(!last_name) 
            missing_arguments += "last_name, ";
        if(!position) 
            missing_arguments += "position, ";
        if(!business_id || isNaN(business_id))
            missing_arguments += "business_id, ";
        missing_arguments = missing_arguments.slice(0, -2);

        // Check for bad args
        var bad_arguments = "";
        if(email && !isEmail(email))
            bad_arguments += "email, ";
        if(position && !staffTypes.includes(position.toLowerCase()))
            bad_arguments += "position, ";
        bad_arguments = bad_arguments.slice(0, -2);

        // Add errors to response
        if(missing_arguments != "")
            res.missing_arguments = missing_arguments;
        if(bad_arguments != "")
            res.bad_arguments = bad_arguments;
        response.status(400).json(res);
        return;
    }

    // Create staff member
    pool.query('INSERT INTO staff (business_id, email, first_name, last_name, position, phone_number) VALUES ($1, $2, $3, $4, $5, $6);',
        [business_id, email.toLowerCase(), first_name, last_name, position.toLowerCase(), phone_number], (error, results) => {
        if(error){
            response.status(500).send(`Internal Server Error`);
            return;
        }

        response.status(201).send(`Staff member created successfully`);
    });
};

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// API
module.exports = {
    connection,

    getAllBusinesses,
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,

    getBusinessStaff,
    getStaffMember,
    createStaff,
};