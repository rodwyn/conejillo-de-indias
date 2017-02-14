'use strict';

import '../styles/main.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';


(function () {
  angular.module('app', ['ui.router']).config(
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      // Default route
      $urlRouterProvider.otherwise('/home');

      var header = {
        templateUrl: '/views/partials/header.html',
        controller: function($scope) {}
      }

      var footer = {
        template: '<h1>Im footer</<h1>',
        controller: function($scope) {}
      }

      // ui router states
      $stateProvider
        .state('home', {
          url: '/',
          views: {
            header: header,
            content: {
              template: '<h2>main page</h2>',
              controller: function($scope) {}
            },
            footer: footer
          }
        })
        .state('cart', {
          url: '/cart',
          views: {
            header: header,
            content: {
              template: '<h2>cart page</h2>',
              controller: function($scope) {}
            },
            footer: footer
          }
        });
    }
  )
})();
