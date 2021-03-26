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

  it('User can log in', function () {
    cy.get('#username').type('masa');
    cy.get('#password').type('salainen');
    cy.get('#loginButton').click();
    cy.contains('Welcome Matti Hälvä!');
    cy.get('#blogView').should('be.visible');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'masa',
        password: 'salainen',
        skipWarnings: false
      });
    });

    it('Renders the landing page', function () {
      cy.get('#blogView').should('be.visible');
      cy.contains('Welcome Matti Hälvä!');
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'New Blog Post',
        author: 'Matti Hälvä',
        url: 'www.masankeittiö.fi'
      });
      cy.get('.blogPost').should('be.visible');
      cy.get('#blogList').children().should('have.length', 1);
    });

    describe('When there are blog posts available', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'New Blog Post',
          author: 'Matti Hälvä',
          url: 'www.masankeittiö.fi'
        });
      });

      it('A blog can be given a like', function () {
        cy.get('#toggleBlogDetails').click();
        cy.get('#likes').should('contain', '0');
        cy.get('#likeButton').click();
        cy.get('#infoMessageDiv').as('infoBox').should('be.visible');
        cy.get('@infoBox').contains('Liked blog New Blog Post!');
        cy.get('#toggleBlogDetails').click().click();
        cy.get('#likes').should('contain', '1');
      });
    });
  });

});