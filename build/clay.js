(function() {
  var Clay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Clay = (function() {
    function Clay(container, opts) {
      this.bindOnResize = __bind(this.bindOnResize, this);
      this.layout = __bind(this.layout, this);
      this.measure = __bind(this.measure, this);
      this._merge(this.defaults, opts);
      this.container = document.querySelector(container);
      this.minWidth = this.defaults['minWidth'];
      this.padding = this.defaults['padding'];
      this.measure();
      this.layout();
      this.bindOnResize();
    }

    Clay.prototype.defaults = {
      minWidth: 200,
      padding: 20
    };

    Clay.prototype.measure = function() {
      var col, height, i, item, itemCnt, offsetWidth, row, width, _i, _len, _ref, _results;
      width = this.container.clientWidth;
      itemCnt = width / this.minWidth;
      this.colCnt = Math.floor(itemCnt);
      if (this.padding) {
        width -= this.padding * (this.colCnt - 1);
      }
      offsetWidth = (width - (this.colCnt * this.minWidth)) / this.colCnt;
      this.itemWidth = offsetWidth + this.minWidth;
      this.grid = [];
      _ref = document.querySelectorAll('.item');
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        height = item.clientHeight;
        col = i % this.colCnt;
        row = Math.floor(i / this.colCnt);
        if (!this.grid[row]) {
          this.grid.push([]);
        }
        _results.push(this.grid[row][col] = {
          x: col === 0 ? 0 : this.itemWidth + this.grid[row][col - 1].x + this.padding,
          y: row === 0 ? 0 : this.grid[row - 1][col].item.clientHeight + this.grid[row - 1][col].y + this.padding,
          item: item
        });
      }
      return _results;
    };

    Clay.prototype.layout = function() {
      var obj, row, _i, _len, _ref, _results;
      _ref = this.grid;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            obj = row[_j];
            obj.item.style.width = "" + this.itemWidth + "px";
            _results1.push(obj.item.style.webkitTransform = "translate(" + obj.x + "px," + obj.y + "px)");
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Clay.prototype.bindOnResize = function() {
      var cb;
      cb = this._debounce((function(_this) {
        return function() {
          _this.measure();
          return _this.layout();
        };
      })(this));
      1000;
      return window.addEventListener('resize', function() {
        return cb();
      });
    };

    Clay.prototype._debounce = function(func, threshold, execAsap) {
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

    Clay.prototype._merge = function(obj1, obj2) {
      var attr, _results;
      _results = [];
      for (attr in obj2) {
        _results.push(obj1[attr] = obj2[attr]);
      }
      return _results;
    };

    return Clay;

  })();

  window.Clay = Clay;

}).call(this);
