const UserRouter = require('./UserRouter')

const routes = (app) => {
    app.use('/api/', UserRouter); 
}

module.exports = routes;