# users-api
AWS User API

I threw this API together to have a simple, Promise-based library
for sample applications that would run in Node or a browser.  The
backend is an AWS API-Gateway connected to DynamoDB.  The access key
limits the number of transactions per month, so it's only for
playing around with ;)

Functions:

getUsers()
saveUser(user)
deleteUser(user)

User object structure:
{
  userId,      // string
  firstName,   // string
  lastName,    // string
  age          // number
}

#Installation:

npm install

#Test suite:

npm test
