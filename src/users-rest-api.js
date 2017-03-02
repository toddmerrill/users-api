require('isomorphic-fetch');

const apiUrl = "https://5pc8ivwxp9.execute-api.eu-central-1.amazonaws.com/prod";
const apiKey = "RvgEcaoOm458DmdmS3ixl2i15DHcDi6J4gTFqoMO"; // very limited monthly budget, so don't be gettin' no crazy ideas ;)
const resourceUrl = apiUrl + '/users';
const headers = new Headers();
headers.set("x-api-key", apiKey)
headers.set('Accept', 'application/json, text/plain, */*')
headers.set('Content-Type', 'application/json')
// headers.set('cache-control', 'no-cache')  // for testing
const conf = {headers}

const R = require('ramda');

const retrieveUsers = () => {
    const req = new Request(resourceUrl, { ...conf, method: 'GET' });
    return fetch(req)
        // .then(logResponse)
        .then((res) => res.json());
}

const saveUser = (user) => {
    const req = new Request(resourceUrl,{ ...conf,
                                        method: 'POST',
                                        body: JSON.stringify(user) });
    return fetch(req)
        // .then(logResponse)
        .then((res) => res.json());
}

const deleteUser = (user) => {
    const req = new Request(resourceUrl + "/" + user.userId, { ...conf,
                                        method: 'DELETE' });
    return fetch(req)
        // .then(logResponse)
        .then((res) => res.json());
}

const logResponse = (res) => {
    console.log('fetch result: ' + JSON.stringify(res, null, 2));
    return res;
}

const usersApi = {
    // currying is superfluous here but if the API changes...
    retrieveUsers: R.curry(retrieveUsers),
    saveUser: R.curry(saveUser),
    deleteUser: R.curry(deleteUser)
}

module.exports = usersApi;
