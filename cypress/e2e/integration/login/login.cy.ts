
describe('Home page', () => {


  before(() => {
    cy.login('user1', 'azerty');
  });


  it('Visits the initial project page', () => {
    //cy.visit('/');
    cy.url().should('include', '/products');
  })
})
