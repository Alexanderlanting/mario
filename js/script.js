// count is the lap of mario 
var count = 1;

// bool is used to check if mario has passed the last flag
var finished = false;

// games is an object with the title and lap of each game
const games = {
    // the number is the lap of mario
    // the title is the title of the game
    // the lap is the lap of the game
    1: { title: "1992 - Super Mario Kart", lap: "Lap 1 / 8" },
    2: { title: "1996 - Mario Kart 64", lap: "Lap 2 / 8" },
    3: { title: "2001 - Mario Kart Super Circuit", lap: "Lap 3 / 8" },
    4: { title: "2003 - Mario Kart Double Dash", lap: "Lap 4 / 8" },
    5: { title: "2005 - Mario Kart DS", lap: "Lap 5 / 8" },
    6: { title: "2008 - Mario Kart Wii", lap: "Lap 6 / 8" },
    7: { title: "2011 - Mario Kart 7", lap: "Lap 7 / 8" },
    8: { title: "2014 - Mario Kart 8 Deluxe", lap: "Lap 8 / 8" },
    9: { title: "Evolution of Mario kart", lap: "Finish" }

};

// on scroll the scrollHandler will be called
function scrollHandler() {
    // dynamic elements are defined using the count variable
    var mario = document.getElementById("mario" + count);
    var flag = document.getElementById("flag" + count);
    var finishtext = document.querySelector('body > h2');
    var box = document.getElementById("randombox" + boxcount);

    // gets the bounding rectangles of the dynamic elements
    var marioRect = mario.getBoundingClientRect();
    var flagRect = flag.getBoundingClientRect();
    var boxRect = box.getBoundingClientRect();

     // if count is 8 and mario has passed the last flag the if will be executed
     if (count == 8 && marioRect.right >= flagRect.left) {
        finishtext.classList.add('finish-animation');
        finished = true;
    }

     // when mario is before the last box the if statement will be executed
     if (marioRect.right < boxRect.left) {
        // set the finished boolean to false
        finished = false;
    }

     // if count is 8 and mario has passed the last flag the if will be executed
     if (marioRect.right <= flagRect.left) {
        finishtext.classList.remove('finish-animation');
    }


    // if mario has passed the flag the if will be executed
    if (marioRect.right >= flagRect.left) {
        // mario will be hidden
        if (count < 8 ) { 
        mario.classList.add("hidden");
       
        }
        // if the count is smaller than 8 the if will be executed
        if (count < 8) {
            // count will be increased by 1
            count++;
            // the body class will be changed to the new count to change the background
            document.body.className = "body" + count;
        }
    }

    else {
        // the next map mario will be shown because the dynamic flag is not reached yet because the count has increased by 1 
        mario.classList.remove("hidden");
        box.classList.remove("hidden");
    }

    // if count is bigger than 1 the if will be executed
    if (count > 1) {
        // the boundingclient of the old flag will be defined
        var oldflag = document.getElementById("flag" + (count - 1)).getBoundingClientRect();

        // if mario has passed the old flag the if will be executed
        if (marioRect.right <= oldflag.left) {
            // the count will be decreased by 1
            count--;
            // the current mario will be hidden
            mario.classList.add("hidden");
            box.classList.add('hidden');
        
            // the body class will be changed to the new count to change the background
            document.body.className = "body" + count;
        }
    }

    // if count is between 1 and 8 the if will be executed
    if (count >= 1 && count <= 8) {
        // the game is defined 
        var game = games[count];

        if (finished && marioRect.right >= flagRect.left) {
            var game = games[count + 1];
        }
        // the title of the game and the lap will be changed 
        document.querySelector("section:nth-of-type(3) h2:nth-of-type(1)").innerHTML = game.title;
        document.querySelector("section:nth-of-type(3) h2:nth-of-type(2)").innerHTML = game.lap;
    }

    // when the scrollHandler is called the mario will be animated
    mario.classList.add('mario-animate');
    // the animation will only be removed when the animation is finished
    mario.addEventListener('animationend', function () {
        mario.classList.remove('mario-animate');
    });

     
   
    console.log(finished)

}

// when the window is scrolled the scrollHandler will be called
window.addEventListener("scroll", scrollHandler);

// when the website is reloaded the scrollHandler will be called
window.onbeforeunload = function () {
    // the window will be scrolled to the top
    window.scrollTo(0, 0);
}

