describe('Clay', function(){

  describe('10 Item fixture with 700px container', function(){

    beforeEach(function (){
      document.body.innerHTML = __html__['test/fixtures/index.html']
      $('.container').width(700);
    });

    describe('items having width 200px, padding 20px', function(){

      beforeEach(function (){
        clay = new Clay('.container', {itemSelector: '.item', padding: 20, gutter: 0})
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

        expect($('.item').eq(9).position().top).toBe(350)
        expect($('.item').eq(9).position().left).toBe(240)
      });

      it('should prepend correctly', function(){
        var newItem = $("<div id='subject' class='item' height: 100px; background-color: green'></div>").get(0)
        clay.prepend(newItem)
        expect($('#subject').position().top).toBe(0)
        expect($('#subject').position().left).toBe(0)
      });

      it('should append correctly', function(){
        var newItem = $("<div id='subject' class='item' height: 100px; background-color: blue'></div>").get(0)
        clay.append(newItem)
        expect($('#subject').position().top).toBe(360)
        expect($('#subject').position().left).toBe(0)
      });

    });
  
  });

});