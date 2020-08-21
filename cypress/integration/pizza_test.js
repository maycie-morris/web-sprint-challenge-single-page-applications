// test that you can add text to the box
// - [ ] test that you can select multiple toppings
// - [ ] test that you can submit the form


describe("Testing form input", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3005/pizza")
    });

    it("Input Name into the Name input", () => {
        cy.get('[for="name"] > input')
          .type("Maycie Morris")
          .should("have.value", "Maycie Morris")

        cy.get('input[type="checkbox"]')
          .check()
          .should("be.checked")

        cy.get("form").submit()

        // Stretch
        cy.get('[href="/"]')
        .click()
        cy.url().should('include', 'http://localhost:3005/')
    });

})