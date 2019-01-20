$(document).ready(function() {
    var time = 15;
    var correctGuess = 0;
    var incorrectGuess = 0;
    var questionNumber = 0;
    var intervalId;

    var questions = [
        {
            question: "Which crowned queen returned for an All Stars season as a competitor?",
            choices: ["Bebe Zahara Benet", "Bianca Del Rio", "Shangela", "Sharon Needles"],
            correctAnswer: "Bebe Zahara Benet",
            image: "<img src='assets/images/bebe.gif' alt='bebe zahara'>"
        },
        {
            question: "Mimi Imfurst became famous, or should I say infamous, for lifting which fellow drag race contestant during their “Lip Sync For Your Life” performance, dubbing the quote “Drag is not a contact sport”?",
            choices: ["Laganja Estranja", "Mystique Summers Madison","India Ferrah", "Kenya Michaels"],
            correctAnswer: "India Ferrah",
            image: "<img src='assets/images/mimi.gif' alt='mimi'>"
        },
        {
            question: "In the regular cycles of RuPaul’s Drag Race, there are only four queens who have won the crown without needing to lip sync for their lives. Who are those winning queens? (Note: This excludes the lip sync for the crown performed before the crowning ceremony.)",
            choices: ["BeBe Zehara Benet, Sharon Needles, Bianca Del Rio, Violet Chachki", "Tyra Sanchez, Bianca Del Rio, Violet Chachki, Sasha Velour", "Raja, Jinkx Monsoon, Alaska, Bob the Drag Queen", "Chad Michaels, Roxxxy Andrews, Bianca Del Rio, Bob the Drag Queen"],
            correctAnswer: "Tyra Sanchez, Bianca Del Rio, Violet Chachki, Sasha Velour",
            image: "<img src='assets/images/winnerbob.gif' alt='winners'>"
        },
        {
            question: "What song did Season 9 winner Sasha Velour lip sync to in which she revealed rose petals hidden in her gloves and wig?",
            choices: ["It’s Not Right But It’s Okay – Whitney Houston", "So Emotional – Whitney Houston", "Stronger – Britney Spears", "Tell It To My Heart – Taylor Dayne"],
            correctAnswer: "So Emotional – Whitney Houston",
            image: "<img src='assets/images/sasha.gif' alt='sasha'>"
        },
        {
            question: "How many times has Shangela competed for the crown?",
            choices: ["1", "2", "3", "4"],
            correctAnswer: "3",
            image: "<img src='assets/images/shangela.gif' alt='shangela'>"
        },
        {
            question: "What season did Michelle Visage start judging Drag Race?",
            choices: ["Season 2", "Season 3", "Season 4", "Season 4"],
            correctAnswer: "Season 3",
            image: "<img src='assets/images/michelle.gif' alt='michelle'>"
        },
        {
            question: "Who did Naomi Smalls lip sync against in the Madonna look challenge of season 8, famously dubbed the “Kimono-she-better-don’t” runway, where four of the remaining six queens all wore the same outfit?",
            choices: ["Derrick Barry", "Jade Jolie", "Acid Betty", "Chi Chi DeVayne"],
            correctAnswer: "Acid Betty",
            image: "<img src='assets/images/betty.gif' alt='betty'>"
        },
        {
            question: "Which queen has NEVER ended up on the bottom two?",
            choices: ["Shangela", "Kim Chi", "Naomi Smalls", "Adore Delano"],
            correctAnswer: "Kim Chi",
            image: "<img src='assets/images/kimchi.gif' alt='kim chi'>"
            
        }
    ];
    
    //display question
    function askQuestion () {
        // for (i=0; i<questions.length; i++) {
        //     (function() {
        //         setTimeout(function(){
        //             console.log(questions);
        //         }, 5000);
        //     }(i));
        //     console.log(questions);
        // };
        $(".gameContent").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $(".gameContent").append("<p>" + questions[questionNumber].question + "</p><p class='choices'>" + 
    		questions[questionNumber].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionNumber].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionNumber].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionNumber].choices[3] + 
            "</p>");
        clearInterval(intervalId);
        timer();
    };

    // if answer correct
    function userCorrect() {
        correctGuess++;
        var answer = questions[questionNumber].correctAnswer;
        var image = questions[questionNumber].image;
        $(".gameContent").html("<p>Shante you stay... You are correct");
        $(".gameContent").append("<p>The answer is: " + answer + "!</p>" + image);
        setTimeout(nextQuestion, 4000);
        questionNumber++;
    };

    //if answer wrong 
    function userWrong() {
        incorrectGuess++;
        var answer = questions[questionNumber].correctAnswer;
        var image = questions[questionNumber].image;
        $(".gameContent").html("<p> Sashay away... you are incorrect");
        $(".gameContent").append("<p>The answer is: " + answer + "!</p>" + image);
        setTimeout(nextQuestion, 4000);
        questionNumber++;
    };
    
    //how to change between questions

    function nextQuestion() {
        if (questionNumber < questions.length) {
			time = 15;
			askQuestion();
		}
		else {
			results();
		}
    };

    function results() {
        $(".gameContent").html("<p> All done! Here's how you did: </p>" + "<p> Correct Answers: " + correctGuess + "</p>" + "<p> Incorrect Answers: " + incorrectGuess + "</p>");
        $(".gameContent").append("<div id='start'>START OVER?</div>");
        reset();
        $("#start").click(askQuestion);
    }

    function reset () {
        time = 15;
        correctGuess = 0;
        incorrectGuess = 0;
        questionNumber = 0;
        intervalId;
    
    }
//if user does not choose any answer 
    function tooSlow() {
        incorrectGuess++;
        var answer = questions[questionNumber].correctAnswer;
        var image = questions[questionNumber].image;
        $(".gameContent").html("<p> Out of time! Good god girl get a grip...</p>");
        $(".gameContent").append("<p>The answer is: " + answer + "!</p>" + image);
        setTimeout(nextQuestion, 4000);
        questionNumber++;
        clearInterval(intervalId);
    }    
    //time goes down and if time runs out, goes to tooSlow screen
    function timer () {
        intervalId = setInterval(decrement, 1000);
        function decrement () {
            console.log(time)
            time--;
            $("#timer").html(time);
             if (time === 0) {
                tooSlow();
                stop();
            } 
        };
        function stop() {
            clearInterval(intervalId);
        };
        decrement();
    }


    //clicking functions
    $("#start").on("click", function(gameplay) {
        $(".gameContent").empty();
        event.preventDefault();
        askQuestion();
        $(".gameContent").on("click", ".choices",(function (){
            var userChoice = $(this).text();
            if (userChoice === questions[questionNumber].correctAnswer) {
                userCorrect();
                clearInterval(intervalId);
            }
            else {
                userWrong();
                clearInterval(intervalId);
            }
            console.log(userChoice);
        }));
    });




})