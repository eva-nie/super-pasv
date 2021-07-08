import { expect } from 'chai';

describe('Operations with numbers', function() {
    const a = 5;
    const b = 7;
    it('Addition works correctly', function() {
       expect(a + b, 'result should equal 12').to.eq(12);
    });

    it('Subtraction works correctly', function(){
        expect(a - b, 'result should equal -2').to.eq(-2);
    });

});