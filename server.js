const app = require("./app")

//CONFIGURATION
require("dotenv").config() 
const PORT = process.env.PORT || 3333;

app.listen(PORT, ()=>{ // listens for request at a specific PORT 
    console.log(`I'm listening at PORT ${PORT}`)
})