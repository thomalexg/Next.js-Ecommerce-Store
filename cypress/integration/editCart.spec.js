describe('edit quantity in cart and delete item from card', () => {
  it('can add item to cart, go to cart, increase quantity by one, decrease quantity by one and delete the product', () => {
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
    // increase quantity by one
    cy.get('[data-cy="increase-item"]')
      // ...and click
      .click();
    // decrease quantity by one
    cy.get('[data-cy="decrease-item"]')
      // ...and click
      .click();
    // delete product from cart
    cy.get('[data-cy="delete-item"]')
      // ...and click
      .click();

    cy.get('[data-cy="empty-cart"]').should('be.visible');

    cy.get('[data-cy="back-to-shop"]').click();
  });
});
