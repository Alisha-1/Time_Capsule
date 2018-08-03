angular
  .module('app')
  .component('register', {
    templateUrl: 'app/register.html',
    controller: function ($log, $state, TimeCapsuleApi) {
      const $ctrl = this;

      $ctrl.submit = function () {
        TimeCapsuleApi.register($ctrl.user.email, $ctrl.user.password)
          .then(function () {
            $state.go('home');
          })
          .catch(function (err) {
            $log.error(err);
          });
      };

      $ctrl.reset = function () {
        $ctrl.user = {
          email: null,
          password: null
        };
        $ctrl.confirmPassword = null;
      };

      $ctrl.reset();
    }
  });

