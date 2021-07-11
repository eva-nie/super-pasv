import { expect } from 'chai';
import supertest from 'supertest';

describe('Auth', function () {
    const request = supertest('https://paysis.herokuapp.com');
    it('Successful log in', function() {
        request
            .post('/auth')
            .send({ login: 'adminius', password: 'super3cret'})
            .expect(200)
            .end((res), function () {
                console.log(res);
            })
    });
});