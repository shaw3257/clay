Clay
====
Clay is an easy to use lightweight masonry-like layout engine
 
http://shaw3257.github.io/clay

#### Features
- Utilize all of container's width.
- CSS transitions on grid changes
- Responsive to window resizes
- Append Items
- Prepend Items
- Dirty checking item heights
- No javascript dependencies
- Test Coverage

#### Install
```HTML
<script type="text/javascript" src="clay.js"></script>
```

#### Initalize
```javascript
/*
* Creates a default Clay layout
* Takes in the container's selector as the first argument
*/
var clay = new Clay('.container');
```

```javascript
/*
* Creates a customized Clay layout
*/
var clay = new Clay('.container', {
  minWidth: 100, 
  gutter: 20, 
  padding: 15, 
  itemSelector: '.myitem'
});
```

#### Prepend Items
```javascript
var item = document.createElement('div');

/*
* Adds new item to dom and into Clay
*/
clay.prepend(item);

/*
* Re-measure and re-layout the grid
*/
clay.reLayout();
```

#### Append Items
```javascript
var item = document.createElement('div');

/*
* Adds new item to dom and into Clay
* Also performs a layout of item since appending
* can be easily optimized to not require a complete
* relayout of grid
*/
clay.append(item);
```
