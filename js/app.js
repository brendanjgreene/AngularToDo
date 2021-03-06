angular.module('TodoApp', ['ngRoute', 'RouteControllers', 'UserService', 'angular-storage', 'TodoService', 'TodoDirective']);
 
angular.module('TodoApp').config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .when('/accounts/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })
    .when('/accounts/logIn', {
        templateUrl: 'templates/logIn.html',
        controller: 'LogInController'
    })
    .when('/accounts/logOut', {
        templateUrl: 'templates/logOut.html',
        controller: 'LogOutController'
    })
    .when('/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    })
    .when('/todo/edit/:id', {
        templateUrl:'templates/edit-todo.html',
        controller: 'EditTodoController'
    });
});