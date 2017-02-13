'use strict';

import '../styles/main.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';


(function () {
  angular.module('app', ['ui.router']).config(
    function($stateProvider, $urlRouterProvider) {
      // Default route
      $urlRouterProvider.otherwise('/home');

      var header = {
        template: '<h1>Im header</<h1>',
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

      // var helloState = {
      //   name: 'hello',
      //   url: '/hello',
      //   template: '<h3>hello world!</h3>'
      // }
      //
      // var aboutState = {
      //   name: 'about',
      //   url: '/about',
      //   template: '<h3>Its the UI-Router hello world app!</h3>'
      // }
      //
      // $stateProvider.state(helloState);
      // $stateProvider.state(aboutState);
    }
  )
})();
