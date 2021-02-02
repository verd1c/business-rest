// Connection config for external dbs
const connection = {
    user: 'me',
    host: 'localhost',
    database: 'business',
    password: 'password',
    port: 5432,
}

// Possible business types
const businessTypes = [
    "bar", 
    "restaurant", 
    "club", 
    "hotel", 
    "cafe"
]

// Possible staff types
const staffTypes = [
    "kitchen",
    "service",
    "pr"
]

module.exports = {
    connection,
    businessTypes,
    staffTypes
}