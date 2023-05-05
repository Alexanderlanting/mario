// boxcount is the lap of mario 
var boxcount = 1;

// bool is a boolean that is used to check if the box is opened or closed
var bool = false;

// these are elements used for the item frame
var frameimg = document.querySelector("#frame img");
var item = document.querySelector("#frame img");
var frame = document.getElementById('frame');


// this function is used to add an interval to the for loop when the randomItem function is called
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// this function is used to randomize the items in the box and show the animation
async function randomItem() {

    // make a list ranging from 1 to 10 in random order
    list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    listrandom = list.sort(function () { return 0.5 - Math.random() });

    // the starting delay between items is 40ms and it increases by 10% every time
    var x = 40;
    for (l in listrandom) {
        x = x * 1.1;
        // the image source is set to the item of l in the list
        item.src = "img/items/" + list[l] + ".png";
        await wait(x)

        // if the box is closed the animation will stop
        if (!bool) {
            return;
        }
        // if the last item is reached the animation will end on the info image
        if (l == listrandom.length - 1) {
            item.src = "img/items/info.png";
            frameimg.classList.add("info-animation");
            frame.classList.add('frame-hover');
        }
    }

}

// this function is used to check if the box should open or close
async function scrollHandler() {

    // gets the dynamic elements of the current lap using boxcount
    var flag = document.getElementById("flag" + boxcount);
    var mario = document.getElementById("mario" + count);
    var box = document.getElementById("randombox" + boxcount);

    // gets the bounding rectangles of the elements
    var marioRect = mario.getBoundingClientRect();
    var boxRect = box.getBoundingClientRect();
    var flagRect = flag.getBoundingClientRect();

    // if mario is after the box and before the flag and the box is not opened yet the box will open and show the animation ending on the info image
    if (marioRect.right >= boxRect.left && marioRect.right <= flagRect.left && !bool) {
        // bool is set to true to confirm that the box is opened
        bool = true;
        // adds the box to the screen
        frame.classList.add("box-animate");
       // only calls the randomItem function if finished is false 
        if (!finished) {
             // calls the randomItem function to start the item animation
            await randomItem();
        }
    }

    // if mario passed has passed the flag the box will close and the boxcount will increase by 1
    if (marioRect.right >= flagRect.left) {
        // increases the boxcount by 1 to show that mario has passed the flag
        if (boxcount < 8) {
            boxcount++
        }
        // bool is set to false to confirm that the box is closed
        bool = false
        // removes the box from the screen
        frame.classList.remove("box-animate");
        // removes the animation from the info image
        frameimg.classList.remove("info-animation");
        frame.classList.remove('frame-hover');
    }

    // if mario is before the box and the box is opened the box will close 
    if (marioRect.right <= boxRect.left && bool == true) {
        // bool is set to false to confirm that the box is closed
        bool = false;
        // removes the box from the screen
        frame.classList.remove("box-animate");
        // removes the animation from the info image
        frameimg.classList.remove("info-animation");
        frame.classList.remove('frame-hover');
    }

    // only if the boxcount is bigger than 1 the box can go back to the previous flag because the first flag does not have a previous flag
    if (boxcount > 1) {
        // if you have finished the boxcount won't increase anymore so the previous flag will be the current flag
        if (finished) {
            var oldflag = document.getElementById("flag" + (boxcount)).getBoundingClientRect();
        }
        // gets the bounding rectangle of the previous flag
        else {
            var oldflag = document.getElementById("flag" + (boxcount - 1)).getBoundingClientRect();
        }
        // if mario goes back to the old flag and the box is closed the box will open and show the animation ending on the info image
        if (marioRect.right <= oldflag.left) {
            // decreases the boxcount by 1 to show that mario has gone back to the previous flag
            if (!finished) {
                boxcount--;
            }
            // bool is set to true to confirm that the box is opened
            bool = true
            // adds the box to the screen
            frame.classList.add("box-animate");
            // make sure that the info image is shown when going over previous flags
            item.src = "img/items/info.png";
            frame.classList.add('frame-hover');
        }
    }

}

// adds the scrollHandler function to the scroll event 
window.addEventListener("scroll", scrollHandler);


