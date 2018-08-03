angular
  .module('app')
  .provider('TimeCapsuleApi', function ($httpProvider) {
    const _this = this;

    _this._apiUrl = '';

    this.setApiUrl = function (url) {
      _this._apiUrl = url + '/api/v1';
    };

    this.setDefaultHeaders = function () {
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    };

    function processResponse(response) {
      if (response && response.success) {
        return response.payload;
      }
      throw buildError(response);
    }

    function buildError(payload) {
      const err = new Error((payload && payload.message) || 'Internal server error');
      err.code = (payload && payload.code) || 500;
      return err;
    }

    this.$get = function ($http, $q) {
      function doRequest(method, endpoint, data, params) {
        return $http({
          method: method,
          data: data,
          params: params,
          url: _this._apiUrl + endpoint
        })
          .then(function (response) {
            try {
              return processResponse(response);
            } catch (err) {
              return $q.reject(err);
            }
          });
      }

      return {
        register: function (email, password) {
          return doRequest('POST', '/authorization/register', {email: email, password: password});
        },
        login: function (email, password) {
          return doRequest('POST', '/authorization/login', {email: email, password: password});
        },
        test: function () {
          return doRequest('GET', '/test');
        },
      };
    };
  });
