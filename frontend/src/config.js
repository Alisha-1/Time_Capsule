angular
  .module('app')
  .config(function (TimeCapsuleApiProvider) {
    TimeCapsuleApiProvider.setApiUrl('');
    TimeCapsuleApiProvider.setDefaultHeaders();
  });
