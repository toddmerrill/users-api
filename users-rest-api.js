const request = require('superagent');

const apiUrl = "https://5pc8ivwxp9.execute-api.eu-central-1.amazonaws.com/prod";
const apiKey = "RvgEcaoOm458DmdmS3ixl2i15DHcDi6J4gTFqoMO"; // very limited monthly budget, so don't be gettin' no crazy ideas ;)
const resourceUrl = apiUrl + '/users';

const R = require('ramda');

const retrieveUsers = function(success, error) {
    const unpackGet = R.curry(function(success, response) {
        // console.log('Superagent HTTP GET result: ' + JSON.stringify(response));
        success(response.body);
    })(success);

    request
      .get(resourceUrl)
      .set("x-api-key", apiKey)
      .set('Accept', 'application/json, text/plain, */*')
      .then(unpackGet, error);
}

const saveUser = function(success, error, user) {
    console.log("userData to persist: " + JSON.stringify(user));
    const unpackPost = R.curry(function(success, response) {
        // console.log('Superagent HTTP POST result: ' + JSON.stringify(response));
        // console.log('Saved user response: ' + JSON.stringify(response));
        success(response.body);
    })(success);

    request
        .post(resourceUrl)
        .send(user)
        .set("x-api-key", apiKey)
        .set('Accept', 'application/json, text/plain, */*')
        .then(unpackPost, error);
};

const deleteUser = function(success, error, user) {
    request
        .del(resourceUrl + "/" + user.userId)
        .set("x-api-key", apiKey)
        .set('Accept', 'application/json, text/plain, */*')
        .then(success, error);
};

const usersApi = {
    retrieveUsers: R.curry(retrieveUsers),
    saveUser: R.curry(saveUser),
    deleteUser: R.curry(deleteUser)
}

module.exports = usersApi;
