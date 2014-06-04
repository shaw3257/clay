clay
====

Clay is a masonry-like layout engine.


##### Install
```HTML
<script type="text/javascript" src="clay.js"></script>
```

##### Initalize
```Javscript
/*
* Creates a default Clay layout
* Takes in the container's selector as the first argument
*/
var clay = new Clay('.container');
```

```Javscript
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

##### Prepend Items
```Javscript
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

##### Append Items
```Javscript
/*
var item = document.createElement('div');

/*
* Adds new item to dom and into Clay
* Also performs a layout of item since appending
* can be easily optimized to not require a complete
* relayout of grid
*/
clay.append(item);
```
