var count = 1;

const games = {
    1: { title: "1992 - Super Mario Kart", lap: "Lap 1/8" },
    2: { title: "1996 - Mario Kart 64", lap: "Lap 2/8" },
    3: { title: "2001 - Mario Kart Super Circuit", lap: "Lap 3/8" },
    4: { title: "2003 - Mario Kart Double Dash", lap: "Lap 4/8" },
    5: { title: "2005 - Mario Kart DS", lap: "Lap 5/8" },
    6: { title: "2008 - Mario Kart Wii", lap: "Lap 6/8" },
    7: { title: "2011 - Mario Kart 7", lap: "Lap 7/8" },
    8: { title: "2014 - Mario Kart 8 Deluxe", lap: "Lap 8/8" }

};

function scrollHandler() {
    var mario = document.getElementById("mario" + count);
    var flag = document.getElementById("flag" + count);

    console.log(count);

    var marioRect = mario.getBoundingClientRect();
    var flagRect = flag.getBoundingClientRect();

    if (marioRect.right >= flagRect.left) {
        mario.classList.add("hidden");
        if (count < 8) {
            count++;
            document.body.className = "body" + count;
        }
    }

    else {
        mario.classList.remove("hidden");
    }

    if (count > 1) {

        var oldflag = document.getElementById("flag" + (count - 1)).getBoundingClientRect();

        if (marioRect.right <= oldflag.left) {
            count--;
            mario.classList.add("hidden");
            document.body.className = "body" + count;
        }
    }

    if (count >= 1 && count <= 8) {
        const game = games[count];
        document.querySelector("section:nth-of-type(3) h2:nth-of-type(1)").innerHTML = game.title;
        document.querySelector("section:nth-of-type(3)  h2:nth-of-type(2)").innerHTML = game.lap;
    }

    const element = document.getElementById("mario" + count)
    element.classList.add('mario-animate');
    element.addEventListener('animationend', function () {
        element.classList.remove('mario-animate');
    });
}


window.addEventListener("scroll", scrollHandler);


