/**
 * Created by svteen.vp on 2014/9/9.
 */
'use strict';

var loginApp = angular.module('loginApp', []);

loginApp.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
]);

loginApp.controller('LoginCtrl',['$scope', '$http', '$templateCache', function($scope, $http, $templateCache){
	var method = "POST";
	var actionUrl = "http://localhost:3000/goto/login/auth";

	$scope.codeStatus = "";
	$scope.cpp = 'cpps';
	$scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
	$scope.igor = { name: 'Vojta', address: '3456 Somewhere Else' };

	$scope.format = 'M/d/yy h:mm:ss a';
	$scope.dialog = 'ddddialog';

	$scope.save = function(){
		var formData = {
			'username' : this.username,
			'password' : this.password
		};

		this.username = '';
		this.password = '';

		var jdata = 'mdata='+JSON.stringify(formData); // The data is to be string.

		$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
			method: method,
			url: actionUrl,
			data:  jdata ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			cache: $templateCache
		}).
		success(function(response) {
			console.log(response);
			$scope.codeStatus = response.msg;
		}).
		error(function(response) {
			console.log('error'); // Getting Error Response in Callback
			$scope.codeStatus = response || 'Request failed';
			console.log($scope.codeStatus);
		});
	}

}]);

loginApp.directive('postdata', function(){
	return {
		restrict: 'AE',
		require: 'ngModel',
		template: '<button class="btn btn-lg btn-primary btn-block" ng-click="save()">登陆</button>',
		link: function(scope, element, attrs, ctrl){

		}
	}
});

loginApp.directive('soso', function(){
	return {
		restrict: 'AE',
		//require: 'ngModel',
		scope: {
			myInfo: '=info'
		},
		template: '<div>{{cpp}}</div>',
		link: function(scope, element, attrs){
			//scope.coolstyle = 'bitch';
			//ctrl.coolstyle = 'bitch';
		}
	}
});

loginApp.directive('myCustomer', function() {
	return {
		restrict: 'E',
		scope: {
			customerInfo: '=info'
		},
		template: 'Name:{{customerInfo}}<br>'
	};
});

loginApp.directive('myCurrentTime', function($timeout, dateFilter) {
	function link(scope, element, attrs) {
		var format,timeoutId;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});

		function scheduleUpdate() {
			// save the timeoutId for canceling
			timeoutId = $timeout(function() {
				updateTime(); // update DOM
				scheduleUpdate(); // schedule the next update
			}, 1000);
		}

		element.on('$destroy', function() {
			$timeout.cancel(timeoutId);
		});

		// start the UI update process.
		scheduleUpdate();
	}

	return {
		link: link
	};

});

loginApp.directive('myDialog', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/ngtpl/my-dialog.html'
	};
});

loginApp.directive('myDraggable', function($document) {
	return function(scope, element, attr) {
		var startX = 0, startY = 0, x = 0, y = 0;

		element.css({
			position: 'relative',
			border: '1px solid red',
			backgroundColor: 'lightgrey',
			cursor: 'pointer',
			zIndex: '111'
		});

		element.on('mousedown', function(event) {
			// 组织所选对象的默认拖曳操作
			event.preventDefault();
			startX = event.pageX - x;
			startY = event.pageY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {
			y = event.pageY - startY;
			x = event.pageX - startX;
			element.css({
				top: y + 'px',
				left:  x + 'px'
			});
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	}
});

loginApp.directive('myTabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function(pane) {
				if (panes.length == 0) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
		},
		templateUrl: '/ngtpl/my-tabs.html'
	};
});

loginApp.directive('myPane', function() {
	return {
		require: '^myTabs',
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		templateUrl: '/ngtpl/my-pane.html'
	};
});