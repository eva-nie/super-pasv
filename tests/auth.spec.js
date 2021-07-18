import {expect} from 'chai';
import supertest from 'supertest';

describe('Auth', function () {
    let result;

   describe('Successful log in', function () {
        before(function(){
        result = supertest(process.env.BASE_URL)
            .post('/auth')
            .send({login: process.env.LOGIN, password: process.env.PASSWORD});
        })

        it('Response status code is 200', function () {
            result.expect(200);
        });

        it('Response body contains authorization token', function () {
            result.end(function (err, res) {
                expect(res.body.token).not.to.be.undefined;
            });
        });
    });

    describe('Log in with wrong credentials should return error', function () {
        before(function(){
            result = supertest(process.env.BASE_URL)
                .post('/auth')
                .send({login: 'wrong', password: 'wrong'});
        });
        it('Response status code is 404', function () {
            result.expect(404);
        });

        it('Response body contains error message', function () {
            result.end(function (err, res) {
                expect(res.body.message).to.eq('Wrong login or password.');
            });
        });
    });
});
