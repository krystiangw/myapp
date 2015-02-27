'use strict';

app.controller('CollegeDashCtrlA', function ($scope, Auth) {
    
	$scope.user = Auth.user;

  });