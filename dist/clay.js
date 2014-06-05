(function() {
  var Column, Grid, Item,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Grid = (function() {
    function Grid(container, opts) {
      this.bindOnResize = __bind(this.bindOnResize, this);
      this.pollDirtyness = __bind(this.pollDirtyness, this);
      this.layout = __bind(this.layout, this);
      this.append = __bind(this.append, this);
      this.prepend = __bind(this.prepend, this);
      this.addItems = __bind(this.addItems, this);
      this.setupGrid = __bind(this.setupGrid, this);
      this.measure = __bind(this.measure, this);
      this._merge_opts(this.defaults, opts);
      this.container = document.querySelector(container);
      this.itemSelector = this.defaults['itemSelector'];
      this.minWidth = this.defaults['minWidth'];
      this.padding = this.defaults['padding'];
      this.gutter = this.defaults['gutter'];
      this.ensureCSS();
      this.measure();
      this.setupGrid();
      this.addItems();
      this.pollDirtyness();
      this.bindOnResize();
    }

    Grid.prototype.defaults = {
      itemSelector: '.item',
      minWidth: 200,
      padding: 10,
      gutter: 20
    };

    Grid.prototype.measure = function() {
      var offsetWidth, width;
      width = this.container.clientWidth;
      this.colCnt = Math.floor(width / this.minWidth);
      width -= this.padding * (this.colCnt - 1);
      width -= this.gutter * 2;
      offsetWidth = (width - (this.colCnt * this.minWidth)) / this.colCnt;
      return this.itemWidth = offsetWidth + this.minWidth;
    };

    Grid.prototype.setupGrid = function() {
      var i, offsetX, _i, _ref, _results;
      console.log('Setting up new grid');
      this.columns = [];
      _results = [];
      for (i = _i = 0, _ref = this.colCnt - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        offsetX = (this.itemWidth * i) + this.gutter;
        offsetX += this.padding * i;
        _results.push(this.columns.push(new Column(this, this.itemWidth, offsetX)));
      }
      return _results;
    };

    Grid.prototype.ensureCSS = function() {
      var item, items, _i, _len, _results;
      this.container.style.position = 'relative';
      items = this.container.querySelectorAll(this.itemSelector);
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(item.style.position = 'absolute');
      }
      return _results;
    };

    Grid.prototype.addItems = function() {
      var item, items, _i, _len, _results;
      items = this.container.querySelectorAll(this.itemSelector);
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(this.append(item));
      }
      return _results;
    };

    Grid.prototype.prepend = function(item) {
      var firstChild;
      if (!this.container.contains(item)) {
        firstChild = this.container.firstChild;
        this.container.insertBefore(item, firstChild);
      }
      this.columns[0].items.unshift(item);
      this.measure();
      this.setupGrid();
      return this.addItems();
    };

    Grid.prototype.append = function(item) {
      var column, isNew, minColumn, _i, _len, _ref;
      isNew = !this.container.contains(item);
      if (isNew) {
        this.container.appendChild(item);
      }
      _ref = this.columns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        column = _ref[_i];
        if (!minColumn || column.height < minColumn.height) {
          minColumn = column;
        }
      }
      console.log('append item', item);
      minColumn.append(item);
      return minColumn.items[minColumn.items.length - 1].layout();
    };

    Grid.prototype.layout = function() {
      var column, _i, _len, _ref, _results;
      _ref = this.columns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        column = _ref[_i];
        _results.push(column.layout());
      }
      return _results;
    };

    Grid.prototype.pollDirtyness = function() {
      return setInterval((function(_this) {
        return function() {
          var column, item, _i, _j, _len, _len1, _ref, _ref1, _results;
          _ref = _this.columns;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            column = _ref[_i];
            _ref1 = column.items;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              item = _ref1[_j];
              item.dirtyCheck();
            }
            if (column.dirty) {
              console.log('found column dirty', column);
              _results.push(column.reLayout());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this), 50);
    };

    Grid.prototype.bindOnResize = function() {
      var cb;
      cb = this._debounce((function(_this) {
        return function() {
          _this.measure();
          _this.setupGrid();
          _this.addItems();
          return _this.layout();
        };
      })(this));
      1000;
      return window.addEventListener('resize', function() {
        return cb();
      });
    };

    Grid.prototype._merge_opts = function(obj1, obj2) {
      var attr, _results;
      _results = [];
      for (attr in obj2) {
        _results.push(obj1[attr] = obj2[attr]);
      }
      return _results;
    };

    Grid.prototype._debounce = function(func, threshold, execAsap) {
      var timeout;
      timeout = null;
      return function() {
        var args, delayed, obj;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        obj = this;
        delayed = function() {
          if (!execAsap) {
            func.apply(obj, args);
          }
          return timeout = null;
        };
        if (timeout) {
          clearTimeout(timeout);
        } else if (execAsap) {
          func.apply(obj, args);
        }
        return timeout = setTimeout(delayed, threshold || 100);
      };
    };

    return Grid;

  })();

  Column = (function() {
    function Column(grid, width, left) {
      this.grid = grid;
      this.width = width;
      this.left = left;
      this.layout = __bind(this.layout, this);
      this.reLayout = __bind(this.reLayout, this);
      this.append = __bind(this.append, this);
      this.items = [];
      this.height = 0;
      this.dirty = false;
    }

    Column.prototype.append = function(item) {
      var offsetY;
      offsetY = this.height + (this.grid.padding * this.items.length);
      this.items.push(new Item(this, item, offsetY));
      return this.height += parseInt(item.clientHeight);
    };

    Column.prototype.reLayout = function() {
      var i, item, offsetY, _i, _len, _ref;
      console.log('column relayout issued');
      this.height = 0;
      _ref = this.items;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        offsetY = this.height + (this.grid.padding * i);
        console.log('offset y', offsetY);
        item.top = offsetY;
        this.height += parseInt(item.item.clientHeight);
      }
      this.layout();
      return this.dirty = false;
    };

    Column.prototype.layout = function() {
      var item, _i, _len, _ref, _results;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(item.layout());
      }
      return _results;
    };

    return Column;

  })();

  Item = (function() {
    function Item(column, item, top) {
      this.column = column;
      this.item = item;
      this.top = top;
      this.layout = __bind(this.layout, this);
      this.dirtyCheck = __bind(this.dirtyCheck, this);
      this.item.style.width = "" + this.column.width + "px";
      console.log('creating item with height:' + this.item.clientHeight, this.item);
      this.height = parseInt(this.item.clientHeight);
      this.dirty = false;
    }

    Item.prototype.dirtyCheck = function() {
      var newHeight;
      newHeight = parseInt(this.item.clientHeight);
      if (this.height !== newHeight) {
        console.log('found item dirty', this.item);
        this.dirty = true;
        this.height = newHeight;
        return this.column.dirty = true;
      }
    };

    Item.prototype.layout = function() {
      var x, y;
      x = this.column.left;
      y = this.top;
      this._setTransform("translate(" + x + "px," + y + "px)");
      return this.dirty = false;
    };

    Item.prototype._setTransform = function(transform) {
      return this.item.style.webkitTransform = this.item.style.MozTransform = transform;
    };

    return Item;

  })();

  window.Clay = Grid;

}).call(this);
