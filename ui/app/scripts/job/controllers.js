/*
 * Copyright 2013-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Definition of Dashboard job controllers.
 *
 * @author Gunnar Hillert
 * @author Ilayaperumal Gopinathan
 */
define(['angular'], function (angular) {
  'use strict';

  return angular.module('xdJobsAdmin.controllers', [])
      .controller('JobExecutionsController',
          ['$scope', '$injector', function ($scope, $injector) {
            require(['job/controllers/executions'], function (jobExecutionsController) {
                console.log('>>>>JobExecutionsController', jobExecutionsController);
              $injector.invoke(jobExecutionsController, this, {'$scope': $scope});
            });
          }])
      .controller('JobExecutionDetailsController',
          ['$scope', '$injector', function ($scope, $injector) {
            require(['job/controllers/execution-details'], function (jobExecutionDetailsController) {
              $injector.invoke(jobExecutionDetailsController, this, {'$scope': $scope});
            });
          }])
      .controller('StepExecutionDetailsController',
          ['$scope', '$injector', function ($scope, $injector) {
            require(['job/controllers/stepexecutiondetails'], function (stepExecutionDetailsController) {
              $injector.invoke(stepExecutionDetailsController, this, {'$scope': $scope});
            });
          }])
      .controller('StepExecutionProgressController',
          ['$scope', '$injector', function ($scope, $injector) {
            require(['job/controllers/stepexecutionprogress'], function (stepExecutionDetailsController) {
              $injector.invoke(stepExecutionDetailsController, this, {'$scope': $scope});
            });
          }]);
});
