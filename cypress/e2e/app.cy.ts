beforeEach(() => {
  cy.visit('iframe.html?id=component-app--primary&viewMode=story');
  cy.get('.block-subtitle').should('be.visible')
})

describe('ui test', () => {
  it('default block ui', () => {
    cy.expectStyle('.block-subtitle', {
      width: '400px',
      height: '100px',
      backgroundColor: 'rgb(0, 0, 0)'
    });
  })

  it('set mode', () => {
    cy.get('body').type('{shift},{r}', { release: false });
    cy.get('body').type('{shift},{r}', { release: true });

    cy.get('.ant-drawer-close').should('be.visible');
    cy.get('.ant-drawer-title').should('have.text', 'Set Mode');
    cy.get('.ant-btn-default > span').should('have.text', 'Reset');
    cy.get('.ant-btn-primary > span').should('have.text', '+ Add Record');
  })
})
