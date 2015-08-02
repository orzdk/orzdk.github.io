deckbuilder.controller("SetViewerController", ["$scope", "DataService2","$timeout","filterFilter", "MyCards", "$filter",

	function($scope, DataService2, $timeout, filterFilter, MyCards, $filter){

	$scope.setInfo = [];
	$scope.typesInfo = [];
	$scope.setTypeFilterArray = ["core","expansion"];

	$scope.cbFilters = {
		cb_core:true,
		cb_expansion: true,
		cb_commander: false,
		cb_conspiracy: false,
		cb_promo: false,
		cb_reprint: false,
		cb_box: false,
		cb_starter: false,
		cb_vanguard: false,
		cb_duel__deck: false,
		cb_from__the__vault: false,
		cb_planechase: false,
		cb_premium__deck: false,
		cb_archenemy: false,
		cb_onlineonly: false,
		cb_un: false
	}

	$scope.min = 148;
	$scope.max = 192;   

	$scope.datefrom = "";
	$scope.dateto = "";

	$scope.textfilter = "";
	$scope.newtoday = 85;

	$scope.timeshiftedtoday = new Date().toISOString().slice(0, 10);

	$scope.$watch('cbFilters', function(new_, old_){
		filterfilter = [];
		_.each(new_, function(filterselection, i){
			if(filterselection == true) {
				filterfilter.push(i.split("__").join(" ").substring(3));
			}
		});

		$scope.setTypeFilterArray = filterfilter;
	}, true);

	$scope.$watch('min', function(new_, old_){
		if ($scope.setInfo[new_]) $scope.datefrom = $scope.setInfo[$scope.min].name + " (" + $scope.setInfo[$scope.min].releaseDate.substring(0,10) + ")" ;
	});

	$scope.$watch('max', function(new_, old_){
		if ($scope.setInfo[new_]) $scope.dateto = $scope.setInfo[$scope.max].name + " (" + $scope.setInfo[$scope.max].releaseDate.substring(0,10) + ")" ;
	});

	$scope.$watch('newtoday', function(new_, old_){
		if($scope.reldates && $scope.reldates[new_]) {
			console.log($scope.reldates[new_]);
			console.log(new_);
		
			$scope.timeshiftedtoday = $scope.reldates[new_].substring(0,10);;
		}
	});

    $scope.toggleFilter = function(settype) {
        var i = $.inArray(settype, $scope.setTypeFilterArray);
        if (i > -1) {
            $scope.setTypeFilterArray.splice(i, 1);
        } else {
            $scope.setTypeFilterArray.push(settype);
        }
    }

	$scope.fireSearch = function(filterSetType){
		$scope.wait = true;
		if (angular.isDefined($scope.filterTimeout)) {
			$timeout.cancel($scope.filterTimeout);
		}
		$scope.filterTimeout = $timeout(function () {
			$scope.toggleFilter(filterSetType);
			$scope.wait = false;
		}, 250);	
	}

	$scope.toggleCheckboxes = function(){
		_.each($scope.cbFilters, function(cb, i, obj){
			obj[i] = !obj[i];
		});

	}

    $scope.indexFilter = function(index, set) {
    	var show = false;
		
    	if ( index >= $scope.min && index <= $scope.max ){
    		if ( $.inArray(set.setType, $scope.setTypeFilterArray ) >= 0 || $scope.setTypeFilterArray.length == 0 ){
    			if ( $scope.textfilter == "" || $scope.textfilter.length < 3 ){
    				show = true;
    			} else {
    				if ( set.name.toLowerCase().indexOf($scope.textfilter.toLowerCase()) > -1 || set.block.toLowerCase().indexOf($scope.textfilter.toLowerCase()) >-1 || set.rotateOutWhenIsReleased.toLowerCase().indexOf($scope.textfilter.toLowerCase()) > -1 ){
    					show = true;
    				}else {
						show = false;
					}
    			}
    		} 
    	}

	   	return show;
    }

	$scope.minusTimeshift = function(){
		$scope.newtoday--;
	}
	
	$scope.plusTimeshift = function(){
		$scope.newtoday++;
	}		
	
	$scope.inStandard = function(set){
		
		var today = new Date($scope.timeshiftedtoday + 'T23:59:59');
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

			$scope.datefrom = $scope.setInfo[$scope.min].name + " (" + $scope.setInfo[$scope.min].releaseDate.substring(0,10) + ")" ;
			$scope.dateto = $scope.setInfo[$scope.max-1].name + " (" + $scope.setInfo[$scope.max-1].releaseDate.substring(0,10) + ")" ;

			//$scope.reldates = _.pluck($scope.setInfo, 'releaseDate');
			$scope.reldates = _.pluck(_.filter($scope.setInfo, function(set){return set.setType=="core" || set.setType=="expansion" }), 'releaseDate');

		});
	}

	initController();

}]);
	