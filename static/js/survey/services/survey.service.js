/**
 * Project
 * @namespace crowdsource.survey.services
 */
(function () {
    'use strict';

    angular
        .module('crowdsource.survey.services')
        .factory('Survey', Survey);

    Survey.$inject = ['HttpService'];

    /**
     * @namespace Survey
     */

    function Survey(HttpService) {

        var Survey = {
            retrieveQuestion: retrieveQuestion,
            saveResponse: saveResponse
        };

        return Survey;

        function retrieveQuestion() {
            var settings = {
                url: '/api/survey/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }

        function saveResponse(pk, answer_picked, tweet_picked) {
            var settings = {
                url: '/api/survey/' + pk + '/submit_result/',
                method: 'POST',
                data: {
                    answer: answer_picked,
                    tweet: tweet_picked
                }
            };
            return HttpService.doRequest(settings);
        }

    }
})();
