angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller: function () {
      const $ctrl = this;

      $ctrl.name = 'this is home page';
    }
  });
