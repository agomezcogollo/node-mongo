const mongoose = require('mongoose')

//const MONGODB_URI = process.env.MONGODB_URI
const { DB_MONGODB_HOST,DB_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${DB_MONGODB_HOST}/${DB_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true
})
    .then(db => console.log('Datbase is Connected') )
    .catch(err => console.log(err) )