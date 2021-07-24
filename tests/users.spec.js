import {expect} from 'chai';
import UsersHelper from '../helpers/users.helper';
import ConfigHelper from '../helpers/config.helper';
import { getRandomItem} from "../helpers/common.helper";

describe('Users', function() {
    const configHelper = new ConfigHelper();

    describe('Create User', function () {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
        });

        it('Response Status Code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response Body Contains User ID', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('Response Body Contains Amount', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });
    })

    describe('Get Specific User', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
            await usersHelper.getSpecific(usersHelper.response.body.id);
        });

        it('Response Status Code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response Body Contains User ID', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('Response Body Contains Amount', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });
    })

    describe('Get All Users', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            for await (const user of Array(3)) {
                await usersHelper.create();
            }
            await usersHelper.getAll();
        });

        it('Response Status Code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response Body Contains List of 3 or More Items', function() {
            expect(usersHelper.response.body.length).to.be.at.least(3);
        });

        it('Response Body List Item Contains  ID ', function() {
            expect(getRandomItem(usersHelper.response.body).id)
                .not.to.be.undefined;
        });

        it('Response Body List Item Contains Amount ', function() {
            expect(getRandomItem(usersHelper.response.body).amount)
                .not.to.be.undefined;
        });
    });

    describe('Delete User', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
            await usersHelper.delete(usersHelper.response.body.id);
        });

        it('Response Status Code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response Body Contains Success Message ', function() {
            expect(usersHelper.response.body.message).to.eq('User deleted.');
        });
    });

    after(async function () {
        await configHelper.wipeData();
    });
})