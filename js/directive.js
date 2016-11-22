angular.module('TodoDirective',[]).directive('todoTable', function() {
  return {
    restrict: 'A',    // A -> attribute
    templateUrl: 'templates/directives/todo-table.html'
  };
});