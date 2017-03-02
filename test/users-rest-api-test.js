const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;

const usersApi =  require('../lib/users-rest-api');

describe('get users', function () {
    it('asserts that the users property is being returned by AWS', function () {
        return assert.eventually.property(
            usersApi.retrieveUsers(), 'users');
    });
});

describe('save and delete user', function () {
    it('saves a test user, then deletes without error', function () {
        const testId = Date.now();
        const testUser = {
          userId: testId,
          firstName: "IntTestFirst",
          lastName: "IntTestLast",
          age: 119
        }
        return assert.isFulfilled(
            usersApi.saveUser(testUser).then(
                usersApi.deleteUser(testUser))
            );
    });
});
