(function () {
    'use strict';

    angular
        .module('app')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', 'API_URL', 'blockUI'];

    function apiService($http, $q, API_URL, blockUI) {
        var service = {
            post: post,
            put, put,
            get: get
        };

        return service;

        /**
       * HTTP POST request to API
       * @param  {string} route   Route in API 
       * @param  {object} request Request data object
       */
        function post(route, request) {
            var deferred = $q.defer();
            var contentType = 'application/json';
            return $http({
                method: 'POST',
                url: API_URL + route,
                data: request,
                headers: {
                    'Content-Type': contentType
                }
            }).then(function (success) {
                deferred.resolve(success);
                return deferred.promise;
            }, function (error) {
                deferred.reject(error);
                return deferred.promise;
            });
        }

        /**
       * HTTP POST request to API
       * @param  {string} route   Route in API 
       * @param  {object} request Request data object
       */
        function put(route, request) {
            var deferred = $q.defer();
            var contentType = 'application/json';
            return $http({
                method: 'PUT',
                url: API_URL + route,
                data: request,
                headers: {
                    'Content-Type': contentType
                }
            }).then(function (success) {
                deferred.resolve(success);
                return deferred.promise;
            }, function (error) {
                deferred.reject(error);
                return deferred.promise;
            });
        }

        /**
      * HTTP GET request to API
      * @param  {string} route           Route in API 
      * @param  {integer} id             ID of the record to get
      * @param  {string} responseType    Response Type Eg:- 'arraybuffer' for file download using blob
      * @param  {integer} id             ID of the record to get
      * @return {object}                 Response data object
      */
        function get(route, id) {
            if (id) {
                route += '/' + id;
            }
            var deferred = $q.defer();
            return $http({
                method: 'GET',
                url: API_URL + route,
                responseType: 'json'
            })
                .then(function (success) {
                    deferred.resolve(success);
                    return deferred.promise;
                }, function (error) {
                    deferred.reject(error);
                    return deferred.promise;
                });
        }
    }
})();