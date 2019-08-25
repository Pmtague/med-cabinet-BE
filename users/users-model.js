const db = require('../data/dbConfig');

module.exports = {
    find,
    add,
    findBy,
    remove
}

function find(){
    return db('users')
}


// {
//     username: string, required, unique
//     password: string, required
//     email: string, required, unique
//     name: string, required
// }


function add(userInfo){
    return db('users').insert(userInfo)
}

function findBy(field, fieldValue){
    return db('users')
        .where({ [field]: fieldValue })
        .first()
}

function remove(id){
    return findBy("id", id)
        .then((user) => {
            console.log(user)
            if (user) {
                return db('users')
                    .where({ id: id })
                    .del()
                    .then(() => {
                        return user
                    })
            } else {
                return null
            }
        })
    
}
