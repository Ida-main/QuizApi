var scoreCounter = 0;
var Qcnt = 0;
var urls;
var rand;
var correctNum;
var isMultiple = false;
var div1 = document.getElementById("div1");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var option4 = document.getElementById("opt4");
var radio1 = document.getElementById("radio1");
var radio2 = document.getElementById("radio2");
var radio3 = document.getElementById("radio3");
var radio4 = document.getElementById("radio4");
var title = document.getElementById("question");
var btn = document.getElementById("nextBtn");
var theDificulty = document.getElementById("difficulty");
var score = document.getElementById("score");

function startLook() {
    document.getElementById("div2").style.visibility = "hidden";
    title.textContent = 'Choose Quiz type';
    nextBtn.textContent = 'START!';
    option1.textContent = 'True/False';
    option2.textContent = 'Multiple Questions';

}

function finish() {
    div1.style.visibility = "hidden";
    document.getElementById("div2").style.visibility = "hidden";

    nextBtn.textContent = 'Menu';
    theDificulty.style.visibility = "hidden";
    score.style.visibility = "hidden";

    title.textContent = 'Your final score is ' + scoreCounter + '/15 !';
}



$(document).ready(
    function () {

        function getquestion() {
            $.ajax({
                url: urls,
                type: "GET",
                success: function (data) {
                    rand = Math.floor(Math.random() * 10);
                    var a1 = (rand % 4) + 1;
                    var a2 = ((rand + 1) % 4) + 1;
                    var a3 = ((rand + 2) % 4) + 1;
                    var a4 = correctNum = ((rand + 3) % 4) + 1;
                    $("#question").html(data.results[0].question);
                    if (isMultiple) {
                        $('#opt' + a1.toString()).html(data.results[0].incorrect_answers[0]);
                        $('#opt' + a2.toString()).html(data.results[0].incorrect_answers[1]);
                        $('#opt' + a3.toString()).html(data.results[0].incorrect_answers[2]);
                        $('#opt' + a4.toString()).html(data.results[0].correct_answer);
                        $('#correctAns').html(data.results[0].correct_answer);
                    } else {
                        a1 = (rand % 2) + 1;
                        a2 = ((rand + 1) % 2) + 1;
                        $('#opt' + a1.toString()).html(data.results[0].incorrect_answers[0]);
                        $('#opt' + a2.toString()).html(data.results[0].correct_answer);
                    }
                    $('#correctAns').html(data.results[0].correct_answer);
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
        startLook();

        var button = document.getElementById("nextBtn");
        button.onclick = function () {
            if(div1.style.visibility == "hidden"){
                location.reload();
            }

            var correctAnswer = document.getElementById("correctAns");
            correctAnswer.style.visibility = "hidden";
            if (Qcnt == 0) {
                if (radio1.checked) {
                    urls = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=boolean";
                    theDificulty.style.visibility = "visible";
                    score.style.visibility = "visible";        
                    var btn = document.getElementById("nextBtn");
                    btn.textContent = 'Next Question';
                    isMultiple = false;
                    theDificulty.textContent = 'Difficulty - Easy';

                } else if (document.getElementById("radio2").checked) {
                    urls = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";
                    theDificulty.style.visibility = "visible";
                    score.style.visibility = "visible";
                    var btn = document.getElementById("nextBtn");
                    document.getElementById("div2").style.visibility = "visible";
                    btn.textContent = 'Next Question';
                    theDificulty.textContent = 'Difficulty - Easy';
                    isMultiple = true;
                } else {
                    alert("Game type was not been chosen. Try again.");
                    location.reload();
                }

            }

            if (Qcnt == 5) {
                theDificulty.textContent = 'Difficulty - Medium';
            } if (Qcnt == 10) {
                theDificulty.textContent = 'Difficulty - Hard';
            } if (Qcnt == 15) {
                finish();
                return;
            }

            if (option1.textContent.toString() == correctAnswer.textContent.toString() && radio1.checked) {
                scoreCounter++;
            } else if (option2.textContent.toString() == correctAnswer.textContent.toString() && radio2.checked) {
                scoreCounter++;
            } else if (option3.textContent.toString() == correctAnswer.textContent.toString() && radio3.checked) {
                scoreCounter++;
            } else if (option4.textContent.toString() == correctAnswer.textContent.toString() && radio4.checked) {
                scoreCounter++;
            }
            getquestion();
            score.textContent = "Score: "+scoreCounter;
            Qcnt++;
        };
        $("#content").click(getquestion);
    });