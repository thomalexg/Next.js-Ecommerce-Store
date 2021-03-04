describe('Checkout flow', () => {
  it('can add item to cart, go to cart, go to checkout, enter data and purchase item', () => {
    // Open the browser to the dev server URL
    cy.visit('/1');
    // Increase number of selected product to one...
    cy.get('[data-cy="increase-item-number-to-one"]')
      // ...and click to increse number to one
      .click();
    // add product to cart...
    cy.get('[data-cy="add-to-cart"]')
      // ...and click on that element
      .click();
    // Get the element corresponding to the H1 in the About page...
    cy.get('[data-cy="go-to-cart"]')
      // ...and click
      .click();
    // enter shipping, contact and payment info
    cy.get('[data-cy="go-to-checkout"]').click();
    cy.get('[data-cy="f-name"]').type('First Name');
    cy.get('[data-cy="l-name"]').type('Lat Name');
    cy.get('[data-cy="street"]').type('Street');
    cy.get('[data-cy="city"]').type('city');
    cy.get('[data-cy="state"]').type('state');
    cy.get('[data-cy="zip"]').type('1180');
    cy.get('[data-cy="card-num"]').type('1254 2125 1554 5874 15');
    cy.get('[data-cy="expire"]').type('10/24');
    cy.get('[data-cy="security-num"]').type('581');
    // purchase product
    cy.get('[data-cy="purchase"]').click();

    cy.get('[data-cy="thankyou"]').should('be.visible');

    cy.get('[data-cy="back-home"]').click();
  });
});
