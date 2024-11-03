describe('Los estudiantes under monkeys', function() {
    beforeEach(() => {
        cy.visit('https://losestudiantes.com');
    });
    it('visits los estudiantes and survives monkeys', function() {
        cy.wait(1000);
        randomClick(10);
    });
    it.only('vistis los estudiantes and survives the revenge of the monkeys' , function() {
        cy.wait(1000);
        randomEvent(5);
    });
})

function randomEvent(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    var events = ["pickCombo"];
    // var events = ["randomClick", "fillTextField", "randomClickButton", "pickCombo"];
    const choice = Math.floor(Math.random() * events.length);

    switch (events[choice]) {
        case "randomClick":
            randomClick(monkeysLeft);
            break;
        case "fillTextField":
            fillTextField(monkeysLeft);
            break;
        case "randomClickButton":
            randomClickButton(monkeysLeft);
            break;
        case "pickCombo":
            pickCombo(monkeysLeft);
            break;
        default:
            break;
    }
}

function randomClick(monkeysLeft) {
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function fillTextField(monkeysLeft) {
    // Es necesario ingregar a alguna universidad
    cy.get('a').should('not.have.class','icon').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
        }
        cy.wait(1000);
    });
    if(monkeysLeft > 0) {
        cy.get('input').then($inputs => {
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            if(!Cypress.dom.isHidden(randomInput)) {
                cy.wrap(randomInput).type(randomText(), {force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            cy.wrap(randomInput).clear({force: true});
            cy.wait(1000);
            // Click a icono de tuerca para regresar a la selección de universidad
            cy.get(".mb-2 .fa-cog").first().click({force: true});
            cy.wait(1000);
            fillTextField(monkeysLeft);
        });
    }
};

function randomClickButton(monkeysLeft) {
    // Implementación de randomClickButton
    // Es necesario ingregar a alguna universidad
    randomClick(1);
    if(monkeysLeft > 0) {
        cy.get('button').then($buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if(!Cypress.dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClickButton(monkeysLeft);
        });
    }
}

function pickCombo(monkeysLeft) {
    // Implementación de pickCombo
    // Semilla para que se ubique en el input de busqueda
    cy.get('a').should('not.have.class','icon').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
        }
        cy.wait(1000);
    });

}

// Utils
function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz /()=?¡!¿&%$#0123456789";

    for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}