const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repo');
const Context = require('../context')

let context;
beforeAll(async() => {
    context = await Context.build();
});

beforeEach(() => {
    return context.reset()
});

// The pool won't close automatically
// it needs to close by this function
afterAll(() =>{
    return context.close();
});

it('create a user', async() => {
    const startingCount = await UserRepo.count();
    // In intial, it doesn't have any user
    // so the expectation is 0 item
    // expect(startingCount).toEqual(0);

    // Then create a user
    await request(buildApp())
        .post('/users')
        .send({ username: 'testuser', bio: 'test bio'})
        .expect(200);
    
    // To verify a user is created
    const finishCount = await UserRepo.count();
    // This expectation must be for a empty databse
    // expect(finishCount).toEqual(1);

    // To test not empty database, it would say
    expect(finishCount - startingCount).toEqual(1);

});