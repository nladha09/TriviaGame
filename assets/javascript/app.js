$(document).ready(function() {
    //Creating variable to track the question & "slide" numbers
    var questionCounter = 0;
    
    // timeout 
    var ansTimeout = 2000;
    
    //Creating score variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    
    //Creating array of user's answers
    var userAns = [];
    
    //Creating an array of objects with the questions, answer options, and correct answer
    var questions = [
    {

    // how to beat cameron's game, character (cast) names, lovelace,
        question: "What does the show's title, 'Halt and Catch Fire' mean?",
        choices: ["The geeky way to stop, drop, and roll",
        "In tech terms, telling a co-worker to go away", 
        "The first computer ever created by woman", 
        "a fictitious command that would make a machine's CPU self-destruct", 
        "the paradox of life"],
        choicesAnswer: 3
    },
    {
        question: "Which old school Atari game is Cameron playing when Joe approaches her in the arcade?",
        choices: ["Dungeon Master", "Tempest", "Centipede", "Space Invaders", "Missile Command"],
        choicesAnswer: 2
    },
    {
        question: "Founded by Cameron Howe and Donna Clark _________ is the company that focuses on gaming and social networking.",
        choices: ["Acuity", "Mutiny", "Euphony", "Congruity", "Impunity"],
        choicesAnswer: 1
    },
    {
        question: "What was the name of Mutiny's top game that Tom Rendon cloned and distributed for free?",
        choices: ["Max Axe", "Earwax", "Poll Tax", "Parallax", "Syntax"],
        choicesAnswer: 3
    },
    {
        question: "What is Gordon Clark diagnosed with in Season 2?",
        choices: ["fibrodysplasia ossificans progressiva", "chronic toxic encephalopathy", "mad cow disease", "ebola", "alice in wonderland syndrome"],
        choicesAnswer: 1
    }];
    
    //Function to submit answers --- CAN I change this to ".click"???
    function submitAns() {
        $("#submit").on("click", function(e) {
            e.preventDefault();
            userAns.length = 0;
                
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        });
    };
        
    //Creating question timer variables & functions
    var timeLeft = 20;
    var increment;
    
    function runTimer() {
        increment = setInterval(decrement, 1000);
    };
    
    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAns.length = 0;		
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        };
    };
    
    function resetTimer() {
        timeLeft = 20;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };
    
    function displayTimer() {
        $("#time-left").html("Answer Review");
    };
    
    function stopTimer() {
        clearInterval(increment);
    };
    
    //Function to display the given response options
    function createRadios() {
        var responseOptions = $("#responses");
        //Empty array for user answer
        responseOptions.empty();
            
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };
    
    //Function to display the given question
    function displayQ() {
        clearQ();
        resetTimer();
        $(".questionX").html(questions[questionCounter].question);
        //Calling the function to display the response options
        createRadios();
        //Creating submit button
        $("#submit-div").append('<button type="submit" class="btn btn-danger" id="submit">' + "Submit" + '</button>');
        runTimer()
        submitAns();
    };
    
    //Display start page
    function displayStart() {
        $("#content").append('<a href="#" class="btn btn-danger btn-lg" id="start-button">' + "Start" + '</a>');
        //Start game
        $("#start-button").on("click", function(event) {
            event.preventDefault();
            //Displays the first question
            firstQ();
            resetTimer();
        });
    };
    
    //Reset for end of game
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userAns = [];
        resetTimer();
    };
    
    //Display end page
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-danger btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        //Restart game
        $("#restart-button").on("click", function(event) {
            event.preventDefault();
            //Displays the first question
            reset();
            clearQ();
            displayStart();
        });
    };
    
    //Function to clear the question
    function clearQ() {
        var questionDiv = $(".questionX");
        questionDiv.empty();
    
        var responsesDiv = $("#responses");
        responsesDiv.empty();
    
        var submitDiv = $("#submit-div");
        submitDiv.empty();
    
        var contentDiv = $("#content");
        contentDiv.empty();
    
        stopTimer();
    };
    
    //Showing whether answer was right/wrong
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAns[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
            correct++;
            displayTimer();
        }
        else if (userAns[0] === undefined) {
            $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            missed++;
            displayTimer();
        }
        else {
            $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            incorrect++;
            displayTimer();
        };
    };
    
    //Function to change the question 
    function nextQ() {
        checkQ();
        //Incrementing the count by 1
        questionCounter++;
        //If the count is the same as the length of the question array, the counts reset to 0
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, ansTimeout);
        } 
        else {
            setTimeout(displayQ, ansTimeout);
        };
    };
    
    //Function to call the first question
    function firstQ() {
        var startContent = $("#content");
        startContent.empty(); 
        displayQ();
    };
    
    //Displays the start page
    displayStart();
    
    });