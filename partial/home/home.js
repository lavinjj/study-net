/*jshint -W083 */
angular.module('studyNet').controller('HomeCtrl', function ($scope, $http) {
    $scope.currentTest = 'general';
    $scope.questions = [];
    $scope.currentQuestion = {};
    $scope.previousQuestions = [];


    $scope.updateCurrentTest = function (value) {
        $scope.currentTest = value;
        $http.get('data/' + value + '.json').then(function (response) {
            $scope.questions = response.data;
            $scope.previousQuestions = [];
            $scope.nextQuestion();
        });
    };

    $scope.nextQuestion = function () {
        var found = true;
        var index = 0;
        while (found) {
            found = false;
            index = Math.floor(Math.random() * $scope.questions.length);
            angular.forEach($scope.previousQuestions, function (id) {
                if (id === index) {
                    found = true;
                }
            });
        }
        $scope.currentQuestion = $scope.questions[index];
        $scope.previousQuestions.push(index);
    };

    $scope.isValidAnswer = function (index) {
        var result = '';
        var answer = $scope.currentQuestion.Answers[index];
        if (answer) {
            if (answer.AnswerId === $scope.currentQuestion.CorrectAnswer) {
                result = "success";
            }
        }
        return result;
    };

    $scope.init = function () {
        $scope.updateCurrentTest('general');
    };

    $scope.init();
});
