const uuid = require("uuid")
const bcrypt  = require("bcrypt")

class Users{
    constructor(){
        this.users = []
    }

    async add(name, email, password){
        if(this.users.filter( (user) => user.email === email ).length > 0){
            throw "This email is already in use!"
        }
        const id = uuid.v4()
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {id: id, name: name, email: email, password: hashedPassword}
        this.users.push(user)
        console.log(this.users)
    }

    findUser(key, value){
        const user = this.users.find( item => item[key] === value )
        return user
    }
}

module.exports = new Users()