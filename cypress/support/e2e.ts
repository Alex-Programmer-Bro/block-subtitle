/// <reference types="cypress" />
import { expectStyle } from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      expectStyle: typeof expectStyle
    }
  }
}

Cypress.Commands.add('expectStyle', expectStyle);
