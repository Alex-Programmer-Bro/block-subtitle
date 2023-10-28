describe('e2e test', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=component-app--primary&viewMode=story');
  })

  it('startup', () => {
    cy.get('.block-subtitle').should('be.visible');
    cy.get('body').type('{shift}', { release: false });
    cy.get('body').type('{r}', { release: false });

    cy.get('body').type('{shift}', { release: true });
    cy.get('body').type('{r}', { release: true });
  })
})
