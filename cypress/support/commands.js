Cypress.Commands.add('loginAsUser', () => {
  loginAndSetToken('user');
});

Cypress.Commands.add('loginAsHR', () => {
  loginAndSetToken('hr');
});

Cypress.Commands.add('loginAsManager', () => {
  loginAndSetToken('manager');
});

// Best security
Cypress.Commands.add('resetDatabase', () => {
  cy.request({
    method: 'GET',
    url: 'http://127.0.0.1:8000/resetDatabase',
  });
});

/**
 * @param {String} role
 */
function loginAndSetToken(role) {
  cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:8000/login',
    body: {
      email: role + '@japantravel.com',
      password: '1234',
    },
  }).then((response) => {
    window.localStorage.setItem('auth_token_default', response.body.token);
  });
}
