import 'cypress-file-upload';
import {
  testValidConfirmPassword,
  testValidName,
  testValidPassword,
} from '../../support/utils';

const {internet} = require('faker');
const name = internet.userName('', '');

describe('Test Profile page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsUser();

    cy.visit('/profile');
    cy.url().should('include', '/profile');
  });

  it('update the user name', () => {
    // require a valid name
    testValidName(name);
    cy.contains('button', 'Update information').should('not.be.disabled');

    // update the user name
    cy.contains('button', 'Update information').click();

    // check if name has been updated
    cy.get('[data-test="name"]').contains(name);
  });

  it('update the user password', () => {
    // require a valid password
    testValidPassword('1234');
    cy.contains('button', 'Update information').should('be.disabled');

    // require same confirm password
    testValidConfirmPassword('1234');

    // is valid filled form
    cy.contains('button', 'Update information').should('not.be.disabled');

    // update the password
    cy.contains('button', 'Update information').click();
  });

  it('update the user image', () => {
    // require valid image
    cy.get('input[type="file"]').attachFile('testPicture.bmp');
    cy.contains('button', 'Update information').should('be.disabled');

    cy.get('input[type="file"]').attachFile('testPicture.png');
    cy.contains('button', 'Update information').should('not.be.disabled');

    cy.contains('button', 'Update information').click();
    cy.url().should('include', '/profile');

    // check if image has been updated
    cy.get('img')
        .first()
        .should('have.attr', 'src')
        .should('include', 'testPicture.png');
  });
});
