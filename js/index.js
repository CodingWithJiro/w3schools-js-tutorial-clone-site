// THEME-TOGGLE FUNCTION
function showIconLight() {
    const iconLight = document.querySelector(".theme__icon--light");
    iconLight.classList.remove("hidden");
}

function hideIconLight() {
    const iconLight = document.querySelector(".theme__icon--light");
    iconLight.classList.add("hidden");
}

function showIconDark() {
    const iconDark = document.querySelector(".theme__icon--dark");
    iconDark.classList.remove("hidden");
}

function hideIconDark() {
    const iconDark = document.querySelector(".theme__icon--dark");
    iconDark.classList.add("hidden");
}

function addActiveTheme() {
    const button = document.querySelector(".theme__button");
    button.classList.add("active");
}

function removeActiveTheme() {
    const button = document.querySelector(".theme__button");
    button.classList.remove("active");
}

function addDarkTheme() {
    const html = document.querySelector("html");
    html.classList.add("dark");
}

function toggleDarkTheme() {
    const html = document.querySelector("html");
    html.classList.toggle("dark");
}

function savedTheme() {
    return localStorage.getItem("theme");
}

function prefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

preLoadDarkTheme();
function preLoadDarkTheme() {
    if (savedTheme() === "dark" || (savedTheme() === null && prefersDark() ) ) {
        addDarkTheme();
        addActiveTheme();
        hideIconLight();
        showIconDark();
    }
}

function isDarkTheme() {
    const html = document.querySelector("html");
    return html.classList.contains("dark");
}

function savePreferredTheme() {
    localStorage.setItem("theme", isDarkTheme() ? "dark" : "light");
}

toggleTheme();
function toggleTheme() {
    const button = document.querySelector(".theme__button");

    button.addEventListener("click", () =>  {
        toggleDarkTheme();

        if ( isDarkTheme() ) {
            addActiveTheme();
            hideIconLight();
            showIconDark();
        } else {
            removeActiveTheme();
            showIconLight();
            hideIconDark();
        }

        savePreferredTheme();
    });
}


// SIDEBAR MENU TOGGLE FUNCTION
function sideMenuToggle() {
    const navContainer = document.getElementById("nav__container");
    const menuIcon = document.getElementById("menu-icon");
    const bodyOverlay = document.getElementById("body__overlay");

    if (navContainer.style.left === "-250px") {
        menuIcon.style.left = "calc(0.5rem + 250px)";
        navContainer.style.left = "0px";
        bodyOverlay.style.display = "block";
    }
    else {
        menuIcon.style.left = "0.5rem";
        navContainer.style.left = "-250px";
        bodyOverlay.style.display = "none";
    }
}

// CLOSE SIDEBAR MENU IF CLICKED OUTSIDE THE SIDEBAR
var bodyOverlay = document.getElementById("body__overlay");
window.onclick = function (event) {
    if (event.target == bodyOverlay) {
        document.getElementById("menu-icon").style.left = "0.5rem";
        document.getElementById("nav__container").style.left = "-250px";
        document.getElementById("body__overlay").style.display = "none";
    }
}

// CLOSE SIDEBAR MENU FUNCTION IF A NAV ITEM IS CLICKED WHICH ONLY HAPPENS IF BODY OVERLAY IS TOGGLED ON DUE TO MENU ICON CLICK
sideMenuCloseListener()

function sideMenuCloseListener() {
    const navItems = document.querySelectorAll(".nav__item");
    const menuIcon = document.getElementById("menu-icon");
    const navContainer = document.getElementById("nav__container");
    const bodyOverlay = document.getElementById("body__overlay");

    function sideMenuClose() {
        menuIcon.style.left = "0.5rem";
        navContainer.style.left = "-250px";
        bodyOverlay.style.display = "none";
    }

    navItems.forEach(navLink => {
        navLink.addEventListener("click", function () {
            if (bodyOverlay.style.display === "block") {
                sideMenuClose();
            }
        });
    });
}

// THE NAV ITEM HIGHLIGHTS WHEN THE USER SCROLLS CLOSE TO IT
scrollSpy()

function scrollSpy() {
    const topics = document.querySelectorAll(".topic");
    const navItems = document.querySelectorAll(".nav__item");

    window.addEventListener("scroll", () => {
        let currentNavItem = "";

        topics.forEach(topic => {
            const topicTop = topic.offsetTop;

            if (scrollY >= topicTop - 200) {
                currentNavItem = topic.getAttribute("id");
            }
        });

        navItems.forEach(navItem => {
            navItem.classList.remove("nav__item--current");
            if (navItem.getAttribute("href") === "#" + currentNavItem) {
                navItem.classList.add("nav__item--current");
            }
        });
    });
}

/* 
==============================
📝 PREVIOUS CODE: Toggle Current Page Highlight When Clicked
Notes: Replaced by scrollSpy(), but keeping for nostalgia
or for future projects as reference since it still works!
==============================

// TOGGLE THE CURRENT-PAGE CLASS TO THE NEW NAV ITEM CLICKED
toggleCurrentPage();

function toggleCurrentPage() {
    const navItem = document.querySelectorAll(".nav__item");
    let currentNavItem = null;

    navItem.forEach(item=> {
        item.addEventListener("click", function() {
        if (currentNavItem) {
            currentNavItem.classList.remove("nav__item--current");
        }
        currentNavItem = item;
        currentNavItem.classList.add("nav__item--current");
        });
    });
}
*/

// TOGGLE OPEN/CLOSE EXPLANATION C0NTENT
toggleExplanation()

function toggleExplanation() {
    const buttons = document.querySelectorAll(".explanation__button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const explanationHeader = button.closest(".explanation__header");
            const explanationContent = explanationHeader.nextElementSibling;
            const explanationButtonIconDown = button.querySelector(".down");
            const explanationButtonIconUp = button.querySelector(".up");

            explanationContent.classList.toggle("hidden");
            explanationButtonIconDown.classList.toggle("hidden");
            explanationButtonIconUp.classList.toggle("hidden");
        });
    });
}

// FOOTER GREETING DAY FUNCTION
footerGreeting();

function footerGreeting() {
    let day = new Date().getDay();
    let greeting = document.querySelector(".footer__greeting");
    switch (day) {
        case 1: {
            greeting.innerHTML = `Have a great <span class="bold italic">Monday!</span>`;
            break
        }
        case 2: {
            greeting.innerHTML = `Have a great <span class="bold italic">Tuesday!</span>`;
            break
        }
        case 3: {
            greeting.innerHTML = `Have a great <span class="bold italic">Wednesday!</span>`;
            break
        }
        case 4: {
            greeting.innerHTML = `Have a great <span class="bold italic">Thursday!</span>`;
            break
        }
        case 5: {
            greeting.innerHTML = `Have a great <span class="bold italic">Friday!</span>`;
            break
        }
        case 6: {
            greeting.innerHTML = `Have a great <span class="bold italic">Saturday!</span>`;
            break
        }
        case 0: {
            greeting.innerHTML = `Have a great <span class="bold italic">Sunday!</span>`;
            break
        }
    }
}

// FOOTER DISPLAYING THE NUMBER OF DAYS PASSED SINCE I STARTED LEARNING FRONTEND WEB DEVELOPMENT
footerDaysPassed();

function footerDaysPassed() {
    // DECLARE THE VARIABLE FOR MY START DATE
    const start = new Date("2025-03-22");
    // DECLARE THE VARIABLE FOR TODAY
    const today = new Date();
    // DECLARE VARIABLE FOR NUMBER OF MILLISECONDS IN A DAY
    const msDay = 1000 * 60 * 60 * 24;
    // DECLARE VARIABLE FOR TIME DIFFERENCE (IN ms BY DEFAULT) BETWEEN TODAY AND START
    const timeDiff = today - start;
    // CONVERT TIMEDIFF TO DAYS;
    const timeDiffDays = timeDiff / msDay;
    // ROUND UP TO THE NEAREST DAY;
    const daysPassed = Math.ceil(timeDiffDays);
    // DECLARE VARIABLE FOR TARGET ELEMENT;
    const footerDays = document.querySelector(".footer__days");

    // DISPLAY THE NUMBER OF DAYS PASSED SINCE MARCH 22, 2025
    footerDays.innerHTML = `It's been <span class="bold">${daysPassed}</span> days since I started learning frontend web development.`;
}

// FOOTER DISPLAYING ITS GENERAL CLEANING DAY EVERY TWO DAYS
footerCleanDay();

function footerCleanDay() {
    // DECLARE A STARTING DAY
    const start = new Date("2025-06-15T00:00:00");
    // DECLARE A VARIABLE FOR TODAY
    const today = new Date();
    // DECLARE A VARIABLE FOR THE TOTAL MILLISECONDS IN ONE DAY
    const msDay = 1000 * 60 * 60 * 24;
    // DECLARE A VARIABLE FOR THE DIFFERENCE BETWEEN TODAY AND STARTING DAY (ms DEFAULT)
    const msDiff = today - start;
    // DECLARE A VARIABLE FOR CONVERTING THE DIFFERENCE FROM ms TO DAYS
    const dayDiff = msDiff / msDay;
    // DECLARE A VARIABLE FOR THE ROUNDED UP DAYDIFF
    const dayDiffRounded = Math.ceil(dayDiff);
    // DECLARE A VARIABLE FOR THE TARGET ELEMENT DISPLAYING THE RESULTS
    const footerClean = document.querySelector(".footer__clean");

    // CREATE A CONDITION THAT IF DAYDIFFROUNDED IS EVEN, DO THE FF:
    if (dayDiffRounded % 2) {
        footerClean.innerHTML = `<b>Reminder:</b> Tomorrow's your general cleaning day.`
    } else {
        footerClean.innerHTML = `<b>Reminder:</b> Today's your cleaning day.`;
    }
}

// FOOTER DISPLAYING CURRENT TIME VIA CLOCK
function timer() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    const clock = document.querySelector(".footer__clock");

    if (minutes.toString().length === 1) {
        minutes = `0${minutes}`;
    }

    if (seconds.toString().length === 1) {
        seconds = `0${seconds}`;
    }

    if (hours > 12) {
        hours = hours - 12;
        clock.innerHTML = `Time <span class="bold">${hours}:${minutes}:${seconds} PM</span>`;
    } else {
        clock.innerHTML = `Time <span class="bold">${hours}:${minutes}:${seconds} AM</span>`;
    }
}

setInterval(timer, 1000);

// INTRODUCTION
// DEMO 1
function openSecret() {
    document.getElementById("introduction__demo1").innerHTML = "&quot;It is only with the heart that one can see rightly; what is essential is invisible to the eye.&quot;";
    document.getElementById("introduction__demo1__button2").style.display = "block";
}

function hideSecret() {
    document.getElementById("introduction__demo1").style.filter = "blur(5px)";
    document.getElementById("introduction__demo1__button3").style.display = "block";
}

function unhideSecret() {
    document.getElementById("introduction__demo1").style.filter = "blur(0px)";
}

// DEMO2
function onSwitch() {
    document.getElementById("introduction__demo2").src = "./img/bulb-on_100x180.gif";
}

function offSwitch() {
    document.getElementById("introduction__demo2").src = "./img/bulb-off_100x180.gif";
}

// DEMO3
function changeStyle() {
    const element = document.getElementById("introduction__demo3");

    element.style.fontWeight = "700";
    element.style.fontSize = "1.5rem";
    element.style.color = "var(--HIGHLIGHT-COLOR)";
    element.style.letterSpacing = "5px";
}

function revertStyle() {
    const element = document.getElementById("introduction__demo3");

    element.style.fontWeight = "400";
    element.style.fontSize = "0.835rem";
    element.style.color = "var(--FONT-COLOR-MAIN)";
    element.style.letterSpacing = "0";
}

// DEMO4
function disappear() {
    const element = document.getElementById("introduction__demo4");

    element.style.display = "none";
}

function reappear() {
    const element = document.getElementById("introduction__demo4");

    element.style.display = "block";
}

// OUTPUT
// DEMO1
function transformElement() {
    const element = document.getElementById("output__demo1");

    element.innerHTML = "<button type='button'>Yehey! I'm a button!</button>"
}

function resetElement() {
    const element = document.getElementById("output__demo1");

    element.innerHTML = "<p class='subtopic__p'>I want to be a button element!</p>";
}

// DEMO2
function changeText() {
    document.getElementById("output__demo2").innerText = "Au Revoir";
}

// DEMO3 - CODED IN HTML

// DEMO4
function dontClick() {
    document.write("Because you've clicked the button, you only get this message. Go back by refreshing your browser to see why this happens. Naughty kid!")
}

// DEMO5
function quoteAlert() {
    window.alert("Your mind is everything. What you think, you become.");
}

// DEMO6
function printMe() {
    window.print();
}

// STATEMENTS
// DEMO1
function findZ() {
    let x, y, z;
    x = 23;
    y = 46;
    z = x + y;

    document.getElementById("statements__demo1").innerHTML =
        "The value of z is <span class='bold highlight'>" + z + "</span>.";
}

// DEMO2
function randomBackgroundColor() {
    const color = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue",
        "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson",
        "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkGrey", "DarkKhaki", "DarkMagenta", "DarkOliveGreen",
        "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet",
        "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro",
        "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "Grey", "HoneyDew", "HotPink", "IndianRed",
        "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan",
        "LightGoldenRodYellow", "LightGray", "LightGreen", "LightGrey", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey",
        "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid",
        "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
        "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
        "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple",
        "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver",
        "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle",
        "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
    ];
    const colorNumber = Math.floor(Math.random() * (color.length - 1)) + 1;
    const element = document.getElementById("statements__demo2");

    element.style.backgroundColor = color[colorNumber];
}

function resetBackgroundColor() {
    const element = document.getElementById("statements__demo2");

    element.style.backgroundColor = "var(--BGCOLOR-DEMO-EXPLANATION-BUTTON)";
}

// SYNTAX
// DEMO1 
function transformToNumber() {
    let element, number;
    element = document.getElementById("syntax__demo1");
    number = 69;

    element.innerHTML = number;
}

function transformToString() {
    let element, string;
    element = document.getElementById("syntax__demo1");
    string = "Make me a number!";

    element.innerHTML = string;
}

// DEMO2
function calculate() {
    let element;
    element = document.getElementById("syntax__demo2");
    element.innerHTML = 69 + 32;
    element.classList.add("bold");
    element.classList.add("highlight");
}

// DEMO3
function evaluateOne() {
    let element;
    element = document.getElementById("syntax__demo3-1");

    element.innerHTML = 5269 + 3731;
    element.classList.add("bold");
    element.classList.add("highlight");
}

function evaluateTwo() {
    let element, x;
    element = document.getElementById("syntax__demo3-2");
    x = 17892288.260869565217391304347826;

    element.innerHTML = x * 69;
    element.classList.add("bold");
    element.classList.add("highlight");
}

function evaluateThree() {
    let element;
    element = document.getElementById("syntax__demo3-3");

    element.innerHTML = "It's over" + " " + 9000;
    element.classList.add("bold");
    element.classList.add("highlight");
}

function easterEgg() {
    let music;
    music = document.getElementById("expresso");

    if (music.currentTime === 0) {
        music.play();
    }

    else if (music.currentTime === music.duration) {
        music.play();
    }

    else {
        music.pause();
        music.currentTime = 0;
    }
}

// DEMO4
function generateQuote() {
    let element, quote, quoteNumber;
    element = document.getElementById("syntax__demo4");
    quote = ["Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Opportunities don't happen. You create them.",
        "If you're going through hell, keep going.",
        "Don't be afraid to give up the good to go for the great.",
        "I find that the harder I work, the more luck I seem to have.",
        "Success is the sum of small efforts repeated day in and day out.",
        "The best revenge is massive success.",
        "It always seems impossible until it's done.",
        "Act as if what you do makes a difference. It does.",
        "Hardships often prepare ordinary people for an extraordinary destiny.",
        "Don't limit your challenges. Challenge your limits.",
        "Dream bigger. Do bigger.",
        "Work hard in silence. Let your success be the noise.",
        "Push yourself, because no one else is going to do it for you.",
        "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream it. Wish it. Do it.",
        "Little things make big days.",
        "It's going to be hard, but hard does not mean impossible.",
        "Don't wait for opportunity. Create it.",
        "Great things never come from comfort zones.",
        "Success doesn't just find you. You have to go out and get it.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Do something today that your future self will thank you for.",
        "A little progress each day adds up to big results.",
        "Don't stop when you're tired. Stop when you're done.",
        "You don't have to be great to start, but you have to start to be great.",
        "Your limitation—it's only your imagination.",
        "Sometimes later becomes never. Do it now.",
        "Great things never come from comfort zones.",
        "Push yourself, because no one else is going to do it for you.",
        "Success doesn't come from what you do occasionally. It comes from what you do consistently.",
        "The way to get started is to quit talking and begin doing.",
        "Don't let yesterday take up too much of today.",
        "You learn more from failure than from success.",
        "It's not whether you get knocked down, it's whether you get up.",
        "People who are crazy enough to think they can change the world are the ones who do.",
        "We may encounter many defeats but we must not be defeated.",
        "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
        "Imagine your life is perfect in every respect; what would it look like?",
        "Security is mostly a superstition. Life is either a daring adventure or nothing.",
        "Do what you can with all you have, wherever you are.",
        "Develop an 'attitude of gratitude'. Say thank you to everyone you meet.",
        "You are never too old to set another goal or to dream a new dream.",
        "To see what is right and not do it is a lack of courage.",
        "Reading is to the mind, as exercise is to the body.",
        "Fake it until you make it. Act as if you had all the confidence you require.",
        "Leadership is the ability to get extraordinary achievement from ordinary people.",
        "Success is getting what you want. Happiness is wanting what you get.",
        "Do not wait; the time will never be 'just right.' Start where you stand.",
        "Whether you think you can or you think you can't, you're right.",
        "The only place where success comes before work is in the dictionary.",
        "What you lack in talent can be made up with desire, hustle and giving 110% all the time.",
        "If you want to achieve greatness stop asking for permission.",
        "The successful warrior is the average man, with laser-like focus.",
        "All progress takes place outside the comfort zone.",
        "Success is the result of preparation, hard work, and learning from failure.",
        "The only difference between ordinary and extraordinary is that little extra.",
        "Your true success in life begins only when you make the commitment to become excellent at what you do.",
        "Start where you are. Use what you have. Do what you can.",
        "When you know what you want, and want it bad enough, you'll find a way to get it.",
        "Action is the foundational key to all success.",
        "In order to succeed, we must first believe that we can.",
        "I attribute my success to this: I never gave or took any excuse.",
        "I've failed over and over and over again in my life and that is why I succeed.",
        "The secret of success is to do the common thing uncommonly well.",
        "Success is not how high you have climbed, but how you make a positive difference to the world.",
        "Try not to become a man of success. Rather become a man of value.",
        "Innovation distinguishes between a leader and a follower.",
        "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
        "What seems to us as bitter trials are often blessings in disguise.",
        "The distance between insanity and genius is measured only by success.",
        "When you stop chasing the wrong things, you give the right things a chance to catch you.",
        "Don't be afraid to give up the good to go for the great.",
        "No masterpiece was ever created by a lazy artist.",
        "Knowledge is being aware of what you can do. Wisdom is knowing when not to do it.",
        "Your problem isn't the problem. Your reaction is the problem.",
        "You can do anything, but not everything.",
        "Motivation is what gets you started. Habit is what keeps you going.",
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "Only put off until tomorrow what you are willing to die having left undone.",
        "If you genuinely want something, don't wait for it — teach yourself to be impatient.",
        "If you want to live a happy life, tie it to a goal, not to people or things.",
        "Nothing will work unless you do.",
        "Start where you are. Use what you have. Do what you can.",
        "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "A goal is not always meant to be reached; it often serves simply as something to aim at.",
        "Hustle in silence and let your success make the noise.",
        "If everything seems under control, you're not going fast enough.",
        "Failure is the condiment that gives success its flavor.",
        "The biggest risk is not taking any risk.",
        "You miss 100% of the shots you don't take.",
        "Believe you can and you're halfway there.",
        "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
        "The difference between who you are and who you want to be is what you do.",
        "Perseverance is failing 19 times and succeeding the 20th.",
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "Do not be embarrassed by your failures, learn from them and start again.",
        "Don't let what you cannot do interfere with what you can do.",
        "Failure is success in progress.",
        "The harder the battle, the sweeter the victory.",
        "Discipline is the bridge between goals and accomplishment.",
        "You don't have to see the whole staircase, just take the first step.",
        "Success is liking yourself, liking what you do, and liking how you do it.",
        "Every accomplishment starts with the decision to try.",
        "Don't wish it were easier; wish you were better.",
        "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
        "If you want something you've never had, you must be willing to do something you've never done.",
        "Success isn't always about greatness. It's about consistency.",
        "Focus on being productive instead of busy.",
        "Work until your idols become your rivals.",
        "The expert in anything was once a beginner.",
        "Dreams don't work unless you do.",
        "You can't have a million-dollar dream with a minimum-wage work ethic.",
        "A river cuts through rock not because of its power, but because of its persistence.",
        "Success is the product of daily habits—not once-in-a-lifetime transformations.",
        "Don't downgrade your dream just to fit your reality. Upgrade your conviction to match your destiny.",
        "You are capable of more than you know.",
        "Slow progress is better than no progress.",
        "Don't count the days, make the days count.",
        "Be stubborn about your goals and flexible about your methods.",
        "Strive for progress, not perfection.",
        "Learn as if you will live forever, live like you will die tomorrow.",
        "Failure is not the opposite of success; it's part of success.",
        "Life is 10% what happens to you and 90% how you react to it.",
        "You don't have to be extreme, just consistent.",
        "Success is nothing more than a few simple disciplines, practiced every day.",
        "Energy and persistence conquer all things.",
        "The secret to getting ahead is getting started.",
        "Success is achieved and maintained by those who try and keep trying.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "Don't be afraid to start over. It's a chance to build something better.",
        "Effort only fully releases its reward after a person refuses to quit.",
        "Don't count your problems — count your blessings.",
        "If you quit once, it becomes a habit. Don't quit.",
        "A winner is just a loser who tried one more time.",
        "Action expresses priorities.",
        "Stay away from those people who try to disparage your ambitions.",
        "The question isn't who is going to let me; it's who is going to stop me.",
        "If you really look closely, most overnight successes took a long time.",
        "Do not be afraid of improving slowly. Be afraid of standing still.",
        "There is no traffic jam along the extra mile.",
        "Every great achievement was once considered impossible.",
        "The only thing standing between you and your goal is the story you keep telling yourself.",
        "Make each day your masterpiece.",
        "Success is not just what you accomplish, but what you inspire others to do.",
        "When everything feels like an uphill struggle, just think of the view from the top.",
        "Ambition is the first step to success. The second is action.",
        "Push yourself, no one else is going to do it for you.",
        "It's not about being the best. It's about being better than you were yesterday.",
        "Your only limit is you.",
        "Be stronger than your excuses.",
        "Keep going. Everything you need will come to you at the perfect time.",
        "The struggle you're in today is developing the strength you need for tomorrow.",
        "Success isn't about how your life looks to others. It's about how it feels to you.",
        "Don't just work hard — work smart and hard.",
        "Success is a decision, not a gift.",
        "Every pro was once an amateur. Every expert was once a beginner.",
        "It's okay to be a glowstick: sometimes you have to break before you shine.",
        "Do it with passion or not at all.",
        "Be so good they can't ignore you.",
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
        "Everything you've ever wanted is on the other side of fear.",
        "Don't be busy, be productive.",
        "Dreams are today's answers to tomorrow's questions.",
        "Even if you fall on your face, you're still moving forward.",
        "Life is short. Work somewhere awesome.",
        "The real opportunity for success lies within the person and not in the job.",
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "The harder you work, the luckier you get.",
        "You must expect great things of yourself before you can do them.",
        "It's never too late to be what you might have been.",
        "Keep learning, because knowledge is power.",
        "There's no elevator to success — you have to take the stairs.",
        "Be fearless in the pursuit of what sets your soul on fire.",
        "Just believe in yourself. Even if you don't, pretend that you do and, at some point, you will.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Be the energy you want to attract.",
        "Mistakes are proof that you're trying.",
        "Nothing great ever came that easy.",
        "One day or day one — you decide.",
        "When you feel like quitting, think about why you started.",
        "A year from now you may wish you had started today.",
        "You didn't come this far to only come this far.",
        "The best way to predict the future is to create it.",
        "Every day may not be good, but there's something good in every day.",
        "Make it happen. Shock everyone.",
        "Discipline is choosing between what you want now and what you want most.",
        "The climb might be tough, but the view from the top is worth it.",
        "Don't compare your beginning to someone else's middle.",
        "You are your only limit.",
        "Just keep swimming.",
        "Progress, not perfection.",
        "Focus on the step in front of you, not the whole staircase.",
        "Storms don't last forever.",
        "Success is a series of small wins.",
        "Go the extra mile. It's never crowded."];
    quoteNumber = Math.floor(Math.random() * quote.length) + 1;

    element.innerHTML = quote[quoteNumber];
    element.classList.add("highlight");
    element.classList.add("italic");
    // element.innerHTML = "You'll never become what you want to be."
    // element.innerHTML = "Life is miserable, you should be too."
}

// VARIABLES
// DEMO1
function assignX() {
    const element = document.getElementById("variables__demo1");
    let x = 5;
    x = (x + 5) * (x + 5);

    element.innerHTML = x;
    element.classList.add("bold", "highlight");
}

// DEMO2
function whatValue() {
    let x,
        y,
        question1 = document.getElementById("variables__demo2-1"),
        question2 = document.getElementById("variables__demo2-2"),
        question3 = document.getElementById("variables__demo2-3");

    question1.innerHTML = x;
    question2.innerHTML = y;
    question3.innerHTML = x + y;

    question1.classList.add("bold", "highlight");
    question2.classList.add("bold", "highlight");
    question3.classList.add("bold", "highlight");
}

// DEMO3
function revealValue1() {
    let x,
        element = document.getElementById("variables__demo3-1");

    x = "1" + 2 + 3;
    element.innerHTML = x;
}

function revealValue2() {
    let x,
        element = document.getElementById("variables__demo3-2");

    x = 1 + 2 + "3";
    element.innerHTML = x;
}

function revealValue3() {
    let x,
        element = document.getElementById("variables__demo3-3");

    x = 1 + "2" + 3;
    element.innerHTML = x;
}

// CONST
// DEMO1
function constValue() {
    const element = document.getElementById("const__demo1");

    try {
        const pi = 3.14;
        pi = 7 + 8 + pi;
    }

    catch (err) {
        element.innerHTML = err;
    }

}

// DEMO2
function displayBrands() {
    const element = document.getElementById("const__demo2");
    const store = [
        "Alienware",
        "ROG",
        "MSI",
        "Corsair",
        "NZXT",
        "HP OMEN",
        "Lenovo Legion",
        "CyberPowerPC",
        "iBUYPOWER"
    ];

    store[0] = "ROG";
    store[1] = "Alienware";
    store.push("Maingear");

    element.innerHTML = store.join(", ");
}

// DEMO3 
function upgradePC() {
    const pc = { CPU: "Intel Core i5-4690K", RAM: "16 GB", Storage: "SSD 512 GB", GPU: "RTX 4060 Ti" };
    const element1 = document.getElementById("const__demo3-1");
    const element2 = document.getElementById("const__demo3-2");
    const element3 = document.getElementById("const__demo3-3");
    const element4 = document.getElementById("const__demo3-4");

    pc.CPU = "Intel Core Ultra 9 285K";
    pc.RAM = "128 GB";
    pc.Storage = "100 TB";
    pc.GPU = "GeForce RTX 5090";

    element1.innerHTML = pc.CPU;
    element2.innerHTML = pc.RAM;
    element3.innerHTML = pc.Storage;
    element4.innerHTML = pc.GPU;


    element1.classList.add("highlight");
    element2.classList.add("highlight");
    element3.classList.add("highlight");
    element4.classList.add("highlight");

    document.getElementById("const__demo3-5").classList.remove("hidden");
    document.getElementById("const__demo3-5").classList.add("display");
}

// ARITHMETIC
// DEMO1 
function addBtn() {
    const answer = document.getElementById("arithmetic__demo1-1");

    answer.innerHTML = 206 + 18 + " patients 🎉🎉🎉";
}

function subtractBtn() {
    const answer = document.getElementById("arithmetic__demo1-2")

    answer.innerHTML = 250 - (206 + 18) + " slots left 🎉🎉🎉";
}

function multiplyBtn() {
    const answer = document.getElementById("arithmetic__demo1-3");

    answer.innerHTML = 5 * 75 + " mg 🎉🎉🎉";
}

function divideBtn() {
    const answer = document.getElementById("arithmetic__demo1-4");
    let ratio = (135 / 85) * 100;
    ratio = Math.ceil(ratio) / 100;

    answer.innerHTML = ratio + " 🎉🎉🎉";
}

function modulusBtn() {
    const answer = document.getElementById("arithmetic__demo1-5");

    answer.innerHTML = 50 % 3 + " pills 🎉🎉🎉";
}

function incrementDecrementBtn() {
    const answer = document.getElementById("arithmetic__demo1-6");
    let x = 5;
    x++; //Value of x is now 6
    x++; //Value of x is now 7
    x++; //Value of x is now 8
    x--; //Value of x is now 7
    x--; //Value of x is now 6
    answer.innerHTML = x + " patients 🎉🎉🎉";
}

function exponentBtn() {
    const answer = document.getElementById("arithmetic__demo1-7");

    let initial = 10;
    let hours = 5;
    let final = initial * (2 ** hours);

    answer.innerHTML = final + " 🎉🎉🎉";
}

// FUNCTIONS
// DEMO1
function cook(appetizer, main, side, drink, dessert, special) {
    return "Here's your food. " + "<br><br>" + "For appetizers, you ordered " + "<span class='bold highlight'>" + appetizer + "</span>" + ". For your main dish, you ordered " + "<span class='bold highlight'>" + main + "</span>" + ". For sides, you ordered " + "<span class='bold highlight'>" + side + "</span>" + ". For drinks, " + "<span class='bold highlight'>" + drink + "</span>" + ". Desserts, you ordered " + "<span class='bold highlight'>" + dessert + "</span>" + ". Lastly, for specials, you ordered " + "<span class='bold highlight'>" + special + "</span>" + "." + "<br><br>" + "Thank you for dining with us. Have a great dinner!";
}

function serve1() {
    const element = document.getElementById("functions__demo1-1");
    element.innerHTML = cook("spring rolls", "steak", "none", "wine", "pudding", "none");
}

function serve2() {
    const element = document.getElementById("functions__demo1-2");
    element.innerHTML = cook("none", "tacos", "mashed potatoes", "complementary water", "none", "vegetarian platter");
}

function serve3() {
    const element = document.getElementById("functions__demo1-3");
    element.innerHTML = cook("soup", "grilled chicken", "rice", "iced tea", "ice cream", "none");
}

// DEMO2
function convertToCelsius(f) {
    return (5 / 9) * (f - 32);
}

function celsiusAnswer() {
    const element = document.getElementById("functions__demo2");
    const input = Number(document.getElementById("temperature").value.trim());
    if (isNaN(input)) {
        element.innerHTML = "⚠️ Please enter a valid Fahrenheit temperature to convert.";
    }
    else {
        const inputRoundedUp = (Math.round(convertToCelsius(input) * 100)) / 100;
        element.innerHTML = `${inputRoundedUp} °C`;
    }
}

// OBJECTS
// DEMO1
function carObject() {
    const car = {
        type: "2025 BMW X5 xDrive50e M Sport",
        engine: "3.0L TwinPower Turbo inline-six engine paired with an electric motor",
        totalOutput: "489 PS and 700 Nm of torque",
        transmission: "8-speed automatic",
        acceleration: "0–100 km/h in 4.8 seconds",
        price: "$365k"
    };
    return car;
}

function carAnswer1() {
    const element = document.getElementById("objects__demo1-1");
    element.innerHTML = `This car <span class="bold">*slaps*</span> is a <span class="bold highlight">${carObject().type}</span>.`;
}

function carAnswer2() {
    const element = document.getElementById("objects__demo1-2");
    element.innerHTML = `This car <span class="bold">*slaps*</span> has a <span class="bold highlight">${carObject().engine}</span>. <span class="italic">It's faster than your ex moving on in your relationship</span>.`;
}

function carAnswer3() {
    const element = document.getElementById("objects__demo1-3");
    element.innerHTML = `This car <span class="bold">*slaps*</span> can pump up <span class="bold highlight">${carObject().totalOutput}</span>. <span class="italic">It's like Thor is doing deadlifts inside your trunk!</span>`;
}

function carAnswer4() {
    const element = document.getElementById("objects__demo1-4");
    element.innerHTML = `This car <span class="bold">*slaps*</span> is an <span class="bold highlight">${carObject().transmission}</span>. <span class="italic">Shifts so smooth, it makes butter feel like sandpaper!</span>`;
}

function carAnswer5() {
    const element = document.getElementById("objects__demo1-5");
    element.innerHTML = `This car <span class="bold">*slaps*</span> can run <span class="bold highlight">${carObject().acceleration}</span>. <span class="italic">By the time you think about the destination, you're already parked there!</span>`;
}

function carAnswer6() {
    const element = document.getElementById("objects__demo1-6");
    element.innerHTML = `This car <span class="bold">*slaps*</span> will only cost you <span class="bold highlight">${carObject().price}</span>. <span class="italic">Payment plans can be negotiated in our office.</span>`;
}

function toggleBohemianRhapsody() {
    const audio = document.getElementById("bohemianRhapsody");
    if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        audio.play();
    }
    else {
        audio.pause();
        audio.currentTime = 0;
    }
}

// ARRAYS
// EXAMPLE1
loopArray();
function loopArray() {
    const fruits = ["Banana", "Orange", "Apple", "Mango"];
    let text = `<ul class="subtopic__ul">`;
    for (let i = 0; i < fruits.length; i++) {
        text += `<li>${fruits[i]}</li>`;
    }
    text += "</ul>";
    document.getElementById("arrays__example1").innerHTML = text;
}

// EXAMPLE2
loopArrayAlt();
function loopArrayAlt() {
    const fruits = ["Banana", "Orange", "Apple", "Mango"];
    let text = `<ul class="subtopic__ul">`;
    fruits.forEach(fruit => {
        text += `<li>${fruit}</li>`;
    });
    text += `</ul>`;
    document.getElementById("arrays__example2").innerHTML = text;
}

// DATE
// EXAMPLE1
currentDate();
function currentDate() {
    const date = new Date();
    document.getElementById("date__example1").innerHTML = `<span class="italic">${date}</span>`;
}

// DEMO1
function showDate() {
    const date = new Date();
    document.getElementById("date__demo1").innerHTML =
        `Your date today is <span class="bold">${date}</span>. Hope it goes well! 💘`;
}

// JUST A UTILITY FUNCTION FOR CHECKING THE VALUE OF A VARIABLE IF TRUE OR NOT
function trueFalseChecker() {
    let x;
    x = NaN;

    console.log("True or False?: ", !!x);
}

// TEST FUNCTION
// --------------------------------------
























