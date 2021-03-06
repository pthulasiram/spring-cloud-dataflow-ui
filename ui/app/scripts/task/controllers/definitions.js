/*
 * Copyright 2013-2016 the original author or authors.
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
 * Definition of Task Definition controller
 *
 * @author Gunnar Hillert
 * @author Ilayaperumal Gopinathan
 */
define(['model/pageable'], function (Pageable) {
  'use strict';
  return ['$scope', 'TaskDefinitions', 'TaskDefinitionService', 'XDUtils', '$state', '$timeout', '$rootScope',
    function ($scope, taskDefinitions, taskDefinitionService, utils, $state, $timeout, $rootScope) {
      function loadTaskDefinitions(pageable, showGrowl) {
        utils.$log.info('pageable', pageable);
        var taskDefinitionsPromise =  taskDefinitions.getAllTaskDefinitions(pageable).$promise;
        taskDefinitionsPromise.then(
            function (result) {
              utils.$log.info(result);

              if (!!result._embedded) {
                $scope.pageable.items = result._embedded.taskDefinitionResourceList;
              }
              $scope.pageable.total = result.page.totalElements;

              var getTaskDefinitions = $timeout(function() {
                loadTaskDefinitions($scope.pageable, false);
              }, $rootScope.pageRefreshTime);
              $scope.$on('$destroy', function(){
                $timeout.cancel(getTaskDefinitions);
              });
            }
        );
        if (showGrowl || showGrowl === undefined) {
          utils.addBusyPromise(taskDefinitionsPromise);
        }
      }
      $scope.pageable = new Pageable();
      $scope.pagination = {
        current: 1
      };
      $scope.pageChanged = function(newPage) {
        $scope.pageable.pageNumber = newPage-1;
        loadTaskDefinitions($scope.pageable);
      };
      $scope.clickModal = function (streamDefinition) {
        $scope.destroyItem = streamDefinition;
      };
      $scope.destroyTask = function (taskDefinition) {
        utils.$log.info('Destroying Task ' + taskDefinition.name);
        utils.$log.info(taskDefinitionService);
        taskDefinitionService.destroy(taskDefinition).$promise.then(
            function () {
              utils.growl.success('Destroy Request Sent.');
              taskDefinition.inactive = true;
              $scope.closeModal();
            },
            function () {
              utils.growl.error('Error Destroying Task.');
              $scope.closeModal();
            }
        );
      };
      $scope.launchTask = function (item) {
        utils.$log.info('Launching Task: ' + item.name);
        $state.go('home.tasks.deploymentsLaunch', {taskName: item.name});
      };

      loadTaskDefinitions($scope.pageable);
    }];
});
