class Clay
  
  constructor: (@container, @minWidth, @padding)->
    @measure()
    @layout()
    @bindOnResize()
    
  measure: =>
    width = @container.width()
    itemCnt = width / @minWidth
    @colCnt = Math.floor(itemCnt)
    width -= ( @padding * ( @colCnt - 1) ) if @padding
    offsetWidth = ( ( width - ( @colCnt * @minWidth ) ) / @colCnt )
    @itemWidth = offsetWidth + @minWidth
    @grid = []
    for item, i in document.querySelectorAll('.item')
      height = item.clientHeight
      col = i % @colCnt
      row = Math.floor( i / @colCnt )
      @grid.push [] if !@grid[row]
      @grid[row][col] = 
        x: if col == 0 then 0 else @itemWidth + @grid[row][col - 1].x + @padding
        y: if row == 0 then 0 else @grid[row - 1][col].item.clientHeight + @grid[row - 1][col].y + @padding
        item: item

  layout: =>
    for row in @grid
      for obj in row
        obj.item.style.width = "#{@itemWidth}px"
        obj.item.style.webkitTransform = "translate(#{obj.x}px,#{obj.y}px)"     
  
  bindOnResize: =>
    cb = @debounce =>
      @measure()
      @layout()
    1000
    window.addEventListener 'resize', ->
      cb()
      
  debounce: (func, threshold, execAsap) ->
    timeout = null
    (args...) ->
      obj = this
      delayed = ->
        func.apply(obj, args) unless execAsap
        timeout = null
      if timeout
        clearTimeout(timeout)
      else if (execAsap)
        func.apply(obj, args)
      timeout = setTimeout delayed, threshold || 100

window.Clay = Clay