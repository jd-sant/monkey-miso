const url = Cypress.config('baseUrl') || "https://losestudiantes.com"
const appName = Cypress.env('appName')|| "your app"
const events = Cypress.env('events')|| 100
const delay = Cypress.env('delay') || 100
var seed = Cypress.env('seed')
var date_ = Cypress.env('date')

const pct_clicks = Cypress.env('pct_clicks') || 25
const pct_keys = Cypress.env('pct_keys') || 25
const pct_combo = Cypress.env('pct_combo') || 25
const pct_buttons = Cypress.env('pct_buttons') || 25

/*
 Bob Jenkins Small Fast, aka smallprng pseudo random number generator is the chosen selection for introducing seeding in the tester
 Credits of the implementation to bryc's answer in this stackoverflow post: https://stackoverflow.com/a/47593316 
*/
function jsf32(a, b, c, d) {
    return function() {
        a |= 0; b |= 0; c |= 0; d |= 0
        var t = a - (b << 27 | b >>> 5) | 0
        a = b ^ (c << 17 | c >>> 15)
        b = c + d | 0
        c = d + t | 0
        d = a + t | 0
        return (d >>> 0) / 4294967296
    }
}

var random = jsf32(0xF1AE533D, seed, seed, seed)

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(random() * (max - min)) + min
}

var evtIndex = 1

// Functions --------------------------------------------------------------------------------------------
var evtIndex = 1

function randomClick() {
    let info = ""
    info = "Getting links"
    cy.get('a').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(randomLink)) {
            info = `Clicking on ${randomLink}`;
            cy.wrap(randomLink).click({force: true});
        }
        cy.wait(delay);
    });
    cy.task("logCommand", { funtype: "Random click", info: info})
    
}

function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz /()=?¡!¿&%$#0123456789";

    for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function fillTextField() {
    let info = ""
    cy.get('input').then($inputs => {
        var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
        if(!Cypress.dom.isHidden(randomInput)) {
            info = `Typing in ${randomInput}`
            cy.wrap(randomInput).type(randomText(), {force: true});
        }
        cy.wait(delay);
    });
    cy.task("logCommand", { funtype: "Fill text field", info: info})
}

function randomClickButton() {
    let info = ""
    cy.get('button').then($buttons => {
        var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
        if(!Cypress.dom.isHidden(randomButton)) {
            info = `Clicking on ${randomButton}`
            cy.wrap(randomButton).click({force: true});
        }
        cy.wait(delay);
    });
    cy.task("logCommand", { funtype: "Random click button", info: info})
}

function pickCombo() {
    // This is for page losestudiantes.com ---> Due we click on a svg that is a dropdown, in other sites only will look for svg tags
    let info = ""
    cy.get('svg').then($svg => {
        var randomSvg = $svg.get(getRandomInt(0, $svg.length));
        if(!Cypress.dom.isHidden(randomSvg)) {
            info = `Clicking on ${randomSvg}`
            cy.wrap(randomSvg).click({force: true});
        }
        cy.wait(delay);
    });
    cy.task("logCommand", { funtype: "Pick combo", info: info})
}

const functions = [
    [randomClick],
    [fillTextField],
    [pickCombo],
    [randomClickButton]
]


function randomEvent(){
    let info = ""
    let typeIndex = getRandomInt(0, pending_events.length)
    info = `Event #${evtIndex} of type ${typeIndex}`
    if(pending_events[typeIndex] > 0){
        let fIndex = getRandomInt(0, functions[typeIndex].length-1)
        functions[typeIndex][fIndex]()
        pending_events[typeIndex] --
        cy.wait(delay)
    }
    else{
        functions.splice(typeIndex, 1)
        pending_events.splice(typeIndex, 1)
    }
    cy.task("logCommand", { funtype: "Random event", info: info})
}

var pending_events = [,,,];


// Start of testing for this monkey :3!! 

describe('Monkey Testing for ' + appName, function() {
    beforeEach(() => {
        cy.visit(url);
    });
    // Visits app and survives the atack of the monkeys for the Kingdom of the Planet of the Apes!!!
    it('visits ' + appName, function() {
        // Define seed
        if(!seed) seed = getRandomInt(0, Number.MAX_SAFE_INTEGER);
        cy.task('logStart', {"type":"monkey", "url":url, "seed":seed});
        cy.wait(1000);
        pending_events[0] = events*pct_clicks/100;
        pending_events[1] = events*pct_keys/100;
        pending_events[2] = events*pct_combo/100;
        pending_events[3] = events*pct_buttons/100;
        //Add an event for each type of event in order to enter the else statement of randomEvent method
        for(let i = 0; i < events + 3 ; i++){
            evtIndex++
            randomEvent();
        }
    });
    afterEach(()=>{
        cy.task('logEnd');
    });
});

