describe('e2e test', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=component-app--primary&viewMode=story');
  })

  it('startup', () => {
    cy.get('.block-subtitle').should('be.visible');
  })
})
