describe('Clay', function(){

  describe('10 Item fixture with 700px container', function(){

    beforeEach(function (){
      document.body.innerHTML = __html__['test/fixtures/index.html']
      $('.container').width(700);
    });

    describe('items having width 200px, padding 20px', function(){

      beforeEach(function (){
        new Clay($('.container'), 200, 20)
      });

      it('should layout correctly', function(){
        expect($('.item').eq(0).position().top).toBe(0)
        expect($('.item').eq(0).position().left).toBe(0)

        expect($('.item').eq(1).position().top).toBe(0)
        expect($('.item').eq(1).position().left).toBe(240)

        expect($('.item').eq(2).position().top).toBe(0)
        expect($('.item').eq(2).position().left).toBe(480)

        expect($('.item').eq(3).position().top).toBe(120)
        expect($('.item').eq(3).position().left).toBe(0)

        expect($('.item').eq(4).position().top).toBe(120)
        expect($('.item').eq(4).position().left).toBe(240)

        expect($('.item').eq(5).position().top).toBe(120)
        expect($('.item').eq(5).position().left).toBe(480)

        expect($('.item').eq(6).position().top).toBe(240)
        expect($('.item').eq(6).position().left).toBe(0)

        expect($('.item').eq(7).position().top).toBe(240)
        expect($('.item').eq(7).position().left).toBe(240)

        expect($('.item').eq(8).position().top).toBe(240)
        expect($('.item').eq(8).position().left).toBe(480)

        expect($('.item').eq(9).position().top).toBe(360)
        expect($('.item').eq(9).position().left).toBe(0)
      });

    });
  
  });

});