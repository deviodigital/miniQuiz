var app = angular.module('miniQuiz', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Which is the first album Tupac released?",
			options: ["Me Against the World", "All Eyez on Me", "2Pacalypse Now", "Until the End of Time"],
			answer: 2
		},
		{
			question: "Which Notorious BIG album didn't break the US top 10?",
			options: ["Ready to Die", "Life After Death", "Born Again", "Duets: The Final Chapter"],
			answer: 0
		},
		{
			question: "Which group worked with Tupac, BIG and Eazy-E?",
			options: ["A Tribe Called Quest", "112", "Wu-Tang Clan", "Bone Thugs-N-Harmony"],
			answer: 3
		},
		{
			question: "Who did Nas release his debut album through?",
			options: ["Sony", "Def Jam", "Columbia", "Flip Mode"],
			answer: 2
		},
		{	
			question: "KRS-One released 'Criminal Minded' with what producer?",
			options: ["Jam Master Jay", "Scott La Rock", "Scott Storch", "Swizz Beatz"],
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

// Controller
$scope.isLast = function(check) {
    var cssClass = check ? 'last' : null;
    return cssClass;
};