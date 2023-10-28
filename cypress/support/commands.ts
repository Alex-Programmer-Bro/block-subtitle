import { CSSProperties } from 'react';

export function expectStyle<T extends keyof CSSProperties>(selector: string, styles: Record<T, string>) {
  for (const key in styles) {
    cy.get(selector).should('have.css', key, styles[key])
  }
  return cy;
}
