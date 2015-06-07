var deckbuilder = angular.module('deckbuilder', 
    ['ngRoute','ui-rangeSlider', 'uiSlider', 'scrollable-table','ui.bootstrap']);

deckbuilder.config(
    ["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "Templates/setviewer.html",
                controller: "SetViewerController"
            })
            .otherwise({
                redirectTo: function () {
                    window.location = "/";
                }
            });
		
        $locationProvider.html5Mode(true);
}]);

