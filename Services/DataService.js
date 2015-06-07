deckbuilder.factory('DataService2', ["$q", "$timeout", "$http", function($q, $timeout, $http) {
    
	var setData = {
        fetch: function() {

            var deferred = $q.defer();

            $timeout(function() {
                $http.get('json/deckbuilder-setdata.json').success(function(data) {
                    deferred.resolve(data);
                });
            }, 30);

            return deferred.promise;
        }
    }

    return {
		setData: setData
	};
}]);
