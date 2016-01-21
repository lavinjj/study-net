/*jshint -W083 */
angular.module('studyNet').controller('HomeCtrl',function($scope, $http){
    $scope.currentTest = 'general';
    $scope.questions = [];
    $scope.currentQuestion = {};
    $scope.previousQuestions = [];


    $scope.updateCurrentTest = function(value){
        $scope.currentTest = value;
        $http.get('data/' + value + '.json').then(function(response){
            $scope.questions = response.data;
            $scope.previousQuestions = [];
            $scope.nextQuestion();
        });
    };

    $scope.nextQuestion = function(){
        var found = false;
        var index = 0;
        while(found){
            index = Math.floor(Math.random() * $scope.questions.length);
            angular.forEach($scope.previousQuestions, function(id){
                if(id === index){
                    found = false;
                }
            });
        }
        $scope.currentQuestion = $scope.questions[index];
        $scope.previousQuestions.push(index);
    };

    $scope.init = function(){
        $scope.updateCurrentTest('general');
    };

    $scope.init();
});
