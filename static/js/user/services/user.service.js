/**
 * User
 * @namespace crowdsource.user.services
 */
(function () {
    'use strict';

    angular
        .module('crowdsource.user.services')
        .factory('User', User);

    User.$inject = ['$cookies', '$http', '$q', 'HttpService'];

    /**
     * @namespace User
     * @returns {Factory}
     */

    function User($cookies, $http, $q, HttpService) {
        var User = {
            getProfile: getProfile,
            updatePreferences: updatePreferences,
            getWorkerConfiguration: getWorkerConfiguration,
            getRequesterConfiguration: getRequesterConfiguration
        };
        return User;

        function getProfile(username) {
            var settings = {
                url: '/api/profile/' + username + '/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }

        function updatePreferences(username, data) {
            var settings = {
                url: '/api/preferences/'+username+'/',
                method: 'PUT',
                data: data
            };
            return HttpService.doRequest(settings);
        }

        function getWorkerConfiguration(){
            var settings = {
                url: '/api/preferences/get_worker_configuration/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }
        function getRequesterConfiguration(){
            var settings = {
                url: '/api/preferences/get_requester_configuration/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }
    }

})();
