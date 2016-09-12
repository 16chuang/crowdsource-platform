/**
 * TaskFeedController
 * @namespace crowdsource.task-feed.controllers
 * @author dmorina
 */
(function () {
    'use strict';

    angular
        .module('crowdsource.survey.controllers')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$window', '$state', '$scope', '$mdToast', 'Survey',
        '$filter', 'Authentication', 'TaskWorker', 'Project', '$rootScope', '$stateParams'];

    /**
     * @namespace SurveyController
     */
    function SurveyController($window, $state, $scope, $mdToast, Survey,
                                $filter, Authentication, TaskWorker, Project, $rootScope, $stateParams) {


        var self = this;
        self.responses = [];
        self.pk = null;
        self.saveResponse = saveResponse;


        activate();

        function activate() {
            retrieveQuestion();
        }

        function retrieveQuestion() {
            Survey.retrieveQuestion().then(
                function success(data) {
                    self.responses = data[0].responses;
                    self.pk = data[0].id;
                },
                function error(errData) {
                    $mdToast.showSimple('Could not fetch response.');
                }
            ).
                finally(function () {
                    // self.loading = false;
                });
        }

        function saveResponse() {
            Survey.saveResponse(self.pk, self.answer, self.tweet).then(
                function success(data, status) {
                    retrieveQuestion();
                    self.answer = null;
                    self.tweet = null;
                },
                function error(errData) {
                    $mdToast.showSimple('Could not save response, please reload');
                }
            ).finally(function () {
                });
        }
    }

})
();
