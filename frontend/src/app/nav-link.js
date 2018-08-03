angular
  .module('app')
  .component('navLink', {
    templateUrl: 'app/nav-link.html',
    bindings: {
      state: '=',
      name: '='
    },
    controller: function ($state) {
      const $ctrl = this;
      $ctrl.goToRoute = function () {
        $state.go($ctrl.state);
      };
    }
  });

