describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion des Produits');
    cy.get('input[type="text"]').type('user1');
    cy.get('input[type="password"]').type('azerty');
    cy.get('button[type="button"]').click();
    cy.url().should('include', '/products');

  })
})
