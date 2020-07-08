const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

// UserSchema.method.encryptPassword = async function(password) {
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password, salt)
// }

UserSchema.method('encryptPassword', async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
});

UserSchema.method('macthPassword', async function( password ) {
    return await bcrypt.compare(password.toString(), this.password)
});

module.exports = model('User', UserSchema)