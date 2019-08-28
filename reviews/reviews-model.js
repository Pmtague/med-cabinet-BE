const db = require('../data/dbConfig')

module.exports = {
    find, add
}

function find(){
    return  db('reviews')
}

function findBy(key, value){
    return db('reviews')
        .where({ [key]: value})
        .first()
}

function add(post){
    // console.log(post)
    return db('reviews').insert(post)
        .then(([id]) => {
            return findBy("id", id)
                .then((review) => {
                    return db('reviews')
                        .where({ user_id: review.user_id})
                })
        })
}