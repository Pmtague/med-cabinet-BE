Register endpoint and required fields
POST - https://med-cabinet-temp.herokuapp.com/api/users/register

    email: string, unique,
    password: string
    username: string, unique,
    name: string

###################################################################

Login endpoint and required fields
POST - https://med-cabinet-temp.herokuapp.com/api/users/login

    email: string,    //<<< must match
    password: string  //<<< registered creds

returns
-token
-entire user object
-array of saved strains
-array of recommendations (not dynamic at the moment)

###################################################################

Send mandatory questionnare
PATCH - https://med-cabinet-temp.herokuapp.com/api/users/:id

need to include user_id in URL of user sending in questionnaire
as an argument, send an object with keys corresponding to those keys of the user object that the questionnaire updates, with the values as the answers.

returns updated user information, reviews, and recommendations (recommendations will soon be dynamic)

###################################################################

Get all users endpoint (use for testing)
GET - https://med-cabinet-temp.herokuapp.com/api/users

###################################################################

Delete user endpoint requires user id in URL (doesn't require authorization token in headers yet but it will)
DELETE - https://med-cabinet-temp.herokuapp.com/api/users/:id

###################################################################

Auth test tests your auth functionality
GET - https://med-cabinet-temp.herokuapp.com/api/users/test
     // requires token acquired from successful login. 
     // token must be sent in header of HTTP call to the endpoint
     // returns some dummy data if token is valid
     // test your auth functionality with this endpoint. 
     // All subsequent endpoints will require auth

###################################################################

Save a strain
POST - https://med-cabinet-temp.herokuapp.com/api/saved/:id

user_id required in URL
argument must be an object with the following schema
{
    strain_id: id
}

returns all saved strains

###################################################################

Get all strains for strain library
GET - https://med-cabinet-temp.herokuapp.com/api/strains
requires token

###################################################################

Delete a saved strain

DELETE - https://med-cabinet-temp.herokuapp.com/api/saved/:strain_id/:user_id

returns new array of saved strains

###################################################################