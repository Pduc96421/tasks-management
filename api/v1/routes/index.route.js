const taskRoutes = require("./task.route");
const userRoutes = require("./user.route");
const statusRoutes = require("./status.route");

module.exports = (app) => {

    const version = "/api/v1";

    app.use(version + "/tasks", taskRoutes);
    
    app.use(version + "/users", userRoutes);

    app.use(version + "/status", statusRoutes);
    
}