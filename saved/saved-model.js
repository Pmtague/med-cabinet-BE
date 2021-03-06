const db = require('../data/dbConfig')

module.exports = {
    find, add, remove
}

function find(){
    return  db('reviews')
}

function findBy(key, value){
    return db('reviews')
        .where({ [key]: value})
        .first()
}

function remove(strain_id, user_id){
    return db('reviews')
        .where({ user_id: user_id, strain_id: strain_id})
        .del()
        .then(() => {
            return db('reviews as r')
                .join('strains as s', 'r.strain_id', 's.id')
                .select('r.strain_id', 's.*',  )
                .where({ user_id: user_id})
        }) 
}

function add(post){
    console.log("user_id", post.user_id)
    console.log("strain_id", post.strain_id)
    let user_id = post.user_id
    let strain_id = post.strain_id
    // console.log(post)
    return db('reviews')
        .where({ user_id: user_id, strain_id: strain_id })
        .then((review) => {
            console.log("REVIEW", review)
            if (review.length !== 0){
                return db('reviews as r')
                    .join('strains as s', 'r.strain_id', 's.id')
                    .select('r.strain_id', 's.*',  )
                    .where({ user_id: user_id})
            } else {
                return db('reviews').insert(post)
                    .then(([id]) => {
                        return findBy("id", id)
                            .then((review) => {
                                return db('reviews as r')
                                    .join('strains as s', 'r.strain_id', 's.id')
                                    .select('r.strain_id', 's.*',  )
                                    .where({ user_id: review.user_id})
                            })
                    })
            }
        })
    
}
