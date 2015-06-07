deckbuilder.controller("SetViewerController", ["$scope", "DataService2","$timeout","filterFilter", "MyCards",

	function($scope, DataService2, $timeout, filterFilter, MyCards){

	$scope.setInfo = [];
	$scope.typesInfo = [];
	$scope.setTypeFilterArray = ["core","expansion"];

	$scope.min = 155;
	$scope.max = 178;   

	$scope.datefrom = "";
	$scope.dateto = "";

	$scope.textfilter = "";
	$scope.newtoday = 170;

	$scope.timeshiftedtoday = new Date().toISOString().slice(0, 7);

	$scope.$watch('min', function(new_, old_){
		if ($scope.setInfo[new_]) $scope.datefrom = $scope.setInfo[$scope.min].name + " (" + $scope.setInfo[$scope.min].releaseDate.substring(0,7) + ")" ;
	});

	$scope.$watch('max', function(new_, old_){
		if ($scope.setInfo[new_]) $scope.dateto = $scope.setInfo[$scope.max].name + " (" + $scope.setInfo[$scope.max].releaseDate.substring(0,7) + ")" ;
	});

	$scope.$watch('newtoday', function(new_, old_){
		if($scope.reldates) $scope.timeshiftedtoday = $scope.reldates[new_].substring(0,7);;
	});

    $scope.addToFilter = function(colour) {
        var i = $.inArray(colour, $scope.setTypeFilterArray);
        if (i > -1) {
            $scope.setTypeFilterArray.splice(i, 1);
        } else {
            $scope.setTypeFilterArray.push(colour);
        }
    }

	$scope.fireSearch = function(criteria){
		$scope.wait = true;
		if (angular.isDefined($scope.filterTimeout)) {
			$timeout.cancel($scope.filterTimeout);
		}
		$scope.filterTimeout = $timeout(function () {
			$scope.addToFilter(criteria);
			$scope.wait = false;
		}, 600);	
	}


    $scope.indexFilter = function(index, set) {
    	var show = false;
    	if ( index >= $scope.min && index <= $scope.max ){
    		if ( $.inArray(set.setType, $scope.setTypeFilterArray ) >= 0 || $scope.setTypeFilterArray.length == 0 ){
    			if ( $scope.textfilter == "" || $scope.textfilter.length < 3 ){
    				show = true;
    			} else {
    				if ( set.name.indexOf($scope.textfilter) > -1 || set.block.indexOf($scope.textfilter) > -1 ){
    					show = true;
    				}
    			}
    		} 
    	}

	   	return show;
    }


	$scope.inStandard = function(set){
		
		var today = new Date($scope.timeshiftedtoday);
		release = new Date(set.releaseDate);
		rotateout = new Date(set.standardRotateOutDate);
		
		if ( (release <= today && today <= rotateout) && (set.setType == "expansion" || set.setType == "core") ){
			return true;
		} else {
			return false;
		}
		
	}

	var initController = function(){
		
		DataService2.setData.fetch().then(function(setinfo){
			$scope.setInfo = setinfo;

			$scope.datefrom = $scope.setInfo[$scope.min].name + " (" + $scope.setInfo[$scope.min].releaseDate.substring(0,7) + ")" ;
			$scope.dateto = $scope.setInfo[$scope.max].name + " (" + $scope.setInfo[$scope.max].releaseDate.substring(0,7) + ")" ;

			$scope.reldates = _.pluck($scope.setInfo, 'releaseDate');
		});
	}

	initController();

}]);
	