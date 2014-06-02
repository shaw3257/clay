class Grid
  constructor: (container, opts)->
    @_merge_opts @defaults, opts
    @container = document.querySelector container
    @itemSelector = @defaults['itemSelector']
    @minWidth = @defaults['minWidth']
    @padding = @defaults['padding']
    @gutter = @defaults['gutter']
    @measure()
    @setupGrid()
    @addItems()
    @layout()
    @pollDirtyness()
    @bindOnResize()

  defaults:
    itemSelector: '.item'
    minWidth: 200
    padding: 10
    gutter: 20
  
  measure: ()=>
    width = @container.clientWidth
    @colCnt = width // @minWidth
    width -= ( @padding * ( @colCnt - 1) ) if @padding
    width -= @gutter * 2 if @gutter
    offsetWidth = ( ( width - ( @colCnt * @minWidth ) ) / @colCnt )
    @itemWidth = offsetWidth + @minWidth
  
  setupGrid: ()=>
    @columns = []
    for i in [0..@colCnt-1]
      console.log('adding new column')
      offsetX = ( @itemWidth * i ) + @gutter
      offsetX += @padding * i
      @columns.push new Column(@, @itemWidth, offsetX )
  
  addItems: ()=>
    items = document.querySelectorAll @itemSelector
    for item in items
      @append(item)

  prepend: (item)=>
    unless @container.contains item
      firstChild = @container.firstChild
      @container.insertBefore(item, firstChild)
    @columns[0].items.unshift(item)
    @measure()
    @setupGrid()
    @addItems()
    @layout()

  append: (item)=>
    isNew = !@container.contains(item)
    @container.appendChild item if isNew
    for column in @columns
      minColumn = column if !minColumn || column.height < minColumn.height
    console.log('append item', item)
    minColumn.append item
    minColumn.items[minColumn.items.length - 1].layout() if isNew

  layout: =>
    console.log('grid layout issued')
    for column in @columns
      column.layout()
      
  pollDirtyness: =>
    setInterval(=>
      for column in @columns
        for item in column.items
          item.dirtyCheck()
        if column.dirty
          console.log('found column dirty', column)
          column.reLayout()
    ,50)

  bindOnResize: =>
    cb = @_debounce =>
      @measure()
      @setupGrid()
      @addItems()
      @layout()
    1000
    window.addEventListener 'resize', ->
      cb()
    
  _merge_opts: (obj1, obj2) ->
    for attr of obj2
      obj1[attr] = obj2[attr]
      
  _debounce: (func, threshold, execAsap) ->
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


class Column
  constructor: (@grid, @width, @left)->
    @items = []
    @height = 0
    @dirty = false

  append: (item)=>
    offsetY = @height + (@grid.padding * @items.length)
    @items.push new Item(@, item, offsetY)
    @height += parseInt(item.style.height)

  reLayout: =>
    console.log('column relayout issued')
    @height = 0
    for item, i in @items
      offsetY = @height + (@grid.padding * i)
      console.log('offset y', offsetY)
      item.top = offsetY
      @height += parseInt(item.item.style.height)
    @layout()
    @dirty = false
  
  layout: =>
    for item in @items 
      item.layout()

class Item
  constructor: (@column, @item, @top)->
    @height = parseInt(@item.style.height)
    @dirty = false
    
  dirtyCheck: =>
    newHeight = parseInt(@item.style.height)
    if @height != newHeight
      console.log('found item dirty', @item)
      @dirty = true
      @height = newHeight
      @column.dirty = true
  
  layout: =>
    @item.style.width = "#{@column.width}px"
    x = @column.left
    y = @top
    @item.style.webkitTransform = "translate(#{x}px,#{y}px)"
    @dirty = false


window.Clay = Grid