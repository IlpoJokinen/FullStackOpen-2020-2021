describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Hälvä',
      username: 'masa',
      password: 'salainen'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.get('#loginForm').should('be.visible');
  });

  it('Loggin in with wrong credentials', function () {
    cy.get('#username').type('masa');
    cy.get('#password').type('wrong');
    cy.get('#loginButton').click();
    cy.get('#infoMessageDiv').should('be.visible');
    cy.contains('Wrong credentials');
  });

  it('user can log in', function () {
    cy.get('#username').type('masa');
    cy.get('#password').type('salainen');
    cy.get('#loginButton').click();
    cy.contains('Welcome Matti Hälvä!');
    cy.get('#blogView').should('be.visible');
  });

  describe('Loggin in with correct credentials', function () {
    beforeEach(function () {
      cy.login({
        username: 'masa',
        password: 'salainen',
        skipWarnings: false
      });
    });
    it('renders the landing page', function () {
      cy.get('#blogView').should('be.visible');
      cy.contains('Welcome Matti Hälvä!');
    });
  });

});