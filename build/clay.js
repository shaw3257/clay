(function() {
  var GridResizer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  GridResizer = (function() {
    function GridResizer(container, minWidth, padding) {
      this.container = container;
      this.minWidth = minWidth;
      this.padding = padding;
      this.bindOnResize = __bind(this.bindOnResize, this);
      this.layout = __bind(this.layout, this);
      this.measure = __bind(this.measure, this);
      this.measure();
      this.layout();
      this.bindOnResize();
    }

    GridResizer.prototype.measure = function() {
      var itemCnt, offsetWidth, width;
      width = this.container.outerWidth();
      itemCnt = width / this.minWidth;
      if (this.padding) {
        width -= this.padding * (itemCnt + 1);
      }
      this.colCnt = Math.floor(itemCnt);
      offsetWidth = (width - (this.colCnt * this.minWidth)) / this.colCnt;
      this.itemWidth = offsetWidth + this.minWidth;
      this.grid = [];
      $('.item').each((function(_this) {
        return function(i, item) {
          var col, height, row;
          height = $(item).height();
          col = i % _this.colCnt;
          row = Math.floor(i / _this.colCnt);
          if (!_this.grid[row]) {
            _this.grid.push([]);
          }
          return _this.grid[row][col] = {
            x: col === 0 ? _this.padding : _this.itemWidth + _this.grid[row][col - 1].x + _this.padding,
            y: row === 0 ? _this.padding : _this.grid[row - 1][col].item.height() + _this.grid[row - 1][col].y + _this.padding,
            item: $(item)
          };
        };
      })(this));
      return console.log(this.grid);
    };

    GridResizer.prototype.layout = function() {
      var obj, row, _i, _len, _ref, _results;
      $('.item').width(this.itemWidth);
      _ref = this.grid;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            obj = row[_j];
            _results1.push(obj.item.css({
              transform: "translate(" + obj.x + "px," + obj.y + "px)"
            }));
          }
          return _results1;
        })());
      }
      return _results;
    };

    GridResizer.prototype.bindOnResize = function() {
      var cb;
      cb = this.debounce((function(_this) {
        return function() {
          _this.measure();
          return _this.layout();
        };
      })(this));
      1000;
      return $(window).on('resize', function() {
        return cb();
      });
    };

    GridResizer.prototype.debounce = function(func, threshold, execAsap) {
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

    return GridResizer;

  })();

}).call(this);
