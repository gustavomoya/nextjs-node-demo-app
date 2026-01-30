require("dotenv").config();
const app = require("./app");

const sequelize = require("./src/config/database");

(async () => {
    try {
        await sequelize.sync(); // only for dev environment

        app.listen(process.env.PORT, () =>
            console.log("API running on port", process.env.PORT)
        );
    } catch (e) {
        console.log(e)
    }
})();