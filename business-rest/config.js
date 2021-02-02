const connection = {
    user: 'me',
    host: 'localhost',
    database: 'business',
    password: 'password',
    port: 5432,
}

const businessTypes = [
    "bar", 
    "restaurant", 
    "club", 
    "hotel", 
    "cafe"
]

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