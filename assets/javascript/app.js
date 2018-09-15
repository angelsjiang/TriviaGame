$(document).ready( function() {

    $("#restart").hide();

    var number = 5;
    var countQues = 0;
    var timeRemain = $("<div class='row timeRemaining'>");
    var question = $("<div class='row question'>");
    var answers = $("<div class='row answers'>");
    var timeCountDown;

    var correct = 0;
    var incorrect = 0;

    var guess;

    //Question object
    var  triviaQuestions= [
        {
            que: "What year was little mermaid released?",
            ans: ["1989","1988","1987","1983"]
        },

        {
            que: "What's the runtime of the movie Lion King from Disney?",
            ans: ["86 minutes", "88 minutes","90 minutes","92 minutes"]
        },

        {
            que: "How many nominations did the movie The Matrix get?",
            ans: ["32 times","45 times","48 times","37 times"]
        }

    ]

    $(document).on("click", "#restart", function() {
        $("#restart").hide();
        $(".timeRemaining").show();
        
        number = 5;
        countQues = 0;
        correct = 0;
        incorrect = 0;

        timeCountDown = setInterval(CountingDown, 1000);
        changingQue();
    });

    $(document).on("click", "#start", function() {
        $("#start").hide();
        timeCountDown = setInterval(CountingDown, 1000);
        changingQue();
        $("#main").append(timeRemain);
        $("#main").append(question);
        $("#main").append(answers);
    })
        
    var CountingDown = function() {
        
        timeRemain.show();
        timeRemain.text("Time Remaining: " + number + " second");

        number--;
        if(number < 0) {
   
            number = 5;
            timeCountDown;
            changingQue();
        }
    };

    // for loop go through the question array
    var changingQue = function() {
        
        $(".question").empty();
        $(".answers").empty();
        
        console.log("CountQues is " + countQues);
        if(countQues < 3) {
            
            // empty the page to put in new questions and answers
            $(".question").empty();
            $(".answers").empty();

            question.append(triviaQuestions[countQues].que);

            for(var i = 0; i < triviaQuestions[countQues].ans.length; i++) {
                var ansButtons = $("<button id='queAns'>");
                ansButtons.attr("value",triviaQuestions[countQues].ans[i]);
                console.log(ansButtons.val() + "outputting val");
                ansButtons.text(triviaQuestions[countQues].ans[i]);
                answers.append(ansButtons);
            }

            countQues += 1;
        }
        else {
            clearInterval(timeCountDown);

            $(".question").append("All Done! Here is how you did!<br><br>")
            $(".answers").append("Correct guesses: " + correct + "<br><br>");
            $(".answers").append("Incorrect guesses " + incorrect);

            $(".timeRemaining").hide();
            $("#restart").show();
        }
    };


    // set a clear function to execute in 5 sec?

    $("#main").on("click", "#queAns", function() {

        console.log($(this).val() + "whats the val?");

        if($(this).val() === "1989") {
            clearInterval(timeCountDown);

            $(".question").empty();
            $(".answers").empty();

            number = 5;
            correct++;
            guess = "yay";
            randomGiphy();
            $(".question").append("YOU GOT IT!");

            timeCountDown = setInterval(CountingDown, 1000);
        }
        else if($(this).val() === "88 minutes") {
            clearInterval(timeCountDown);

            $(".question").empty();
            $(".answers").empty();

            number = 5;
            correct++;
            guess = "yay";
            randomGiphy();
            $(".question").append("YOU GOT IT!");

            timeCountDown = setInterval(CountingDown, 1000);
        }
        else if($(this).val() === "48 times") {
            clearInterval(timeCountDown);

            $(".question").empty();
            $(".answers").empty();

            number = 5;
            correct++;
            guess = "yay";
            randomGiphy();
            $(".question").append("YOU GOT IT!");
            
            timeCountDown = setInterval(CountingDown, 1000);
        }
        else {
            clearInterval(timeCountDown);

            $(".question").empty();
            $(".answers").empty();

            number = 5;
            incorrect++;
            guess = "uhoh";
            randomGiphy();
            $(".question").append("Sorry, it's not right...");
            
            timeCountDown = setInterval(CountingDown, 1000);
        }
    });

    var randomGiphy = function() {

        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + guess;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {

            var imageSrc = response.data.image_original_url;
            var randomGIF = $("<img>");

            randomGIF.attr("src", imageSrc);
            randomGIF.attr("alt", "random giphy");

            $(".answers").append(randomGIF);
        })
    }
})