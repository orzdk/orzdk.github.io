deckbuilder.filter('reverse', function() {
  return function(items) {
  	if (items && items.length > 0)
    	return items.slice().reverse();
	else
		return []
  };
});
