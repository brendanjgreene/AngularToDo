angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('LogOutController', function($scope, store) {
        $scope.title = "You are Logged Out!";
        store.remove('username');
        store.remove('authToken');
    })
    .controller('RegisterController', function($scope, UserAPIService, store) {
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function() {
            UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
                $location.path("/todo");
            }).catch(function(err) {
                console.log(err.data);
            });
        };

        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to Angular Todo");
                    $scope.login();
                }).catch(function(err) {
                    alert("Oops! Something went wrong!");
                });
            }
        };
    })
    .controller('LogInController', function($scope, $location, UserService, store) {
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.submitForm = function() {
            if ($scope.logInForm.$isValid) {
                $scope.logInUser.username = $scope.user.username;
                $scope.logInUser.password = $scope.user.password;

                UserAPIService.callAPI(url + "accounts/api-token-auth", $scope.data).then(function(results) {
                    $scope.token = results.data.token;
                    store.set('username', $scope.logInUser.username);
                    store.set('authToken', $scope.token);
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
    })
    .controller('TodoController', function($scope, $location, TodoAPIService, store) {
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');

        $scope.todo = {};

        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        };

        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(url + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
                console.log(results);
            }).catch(function(err) {
                console.log(err);
            });
        };

        if (!store.get('authToken')) {
            $location.path("/");
        }

        TodoAPIService.getTodos(url + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data;
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.title = $scope.todo.title;
                $scope.todo.description = $scope.todo.description;
                $scope.todo.status = $scope.todo.status;
                $scope.todo.username = $scope.username;

                console.log($scope.todo.username)

                TodoAPIService.createTodo(url + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results)
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
    })
    .controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store) {
        var id = $routeParams.id;
        var url = "https://morning-castle-91468.herokuapp.com/";

        TodoAPIService.getTodos(url + "todo/" + id, $scope.username, store.get('authToken')).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
 
                TodoAPIService.editTodo(url + "todo/" + id, $scope.todo, store.get('authToken')).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
    });