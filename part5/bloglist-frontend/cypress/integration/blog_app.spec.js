describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const users = [
      {
        name: 'Matti Hälvä',
        username: 'masa',
        password: 'salainen'
      },
      {
        name: 'Seppo Saario',
        username: 'sepi',
        password: 'salasana'
      }
    ];
    users.forEach(user => {
      cy.request('POST', 'http://localhost:3003/api/users', user);
    });
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

      it('Owner of the blog can remove the post', function () {
        cy.get('#toggleBlogDetails').click();
        cy.get('#removeBlogButton').click();
        cy.get('#blogList').should('be.visible');
        cy.get('#blogList').children().should('not.exist');
      });
    });
  });

  describe('When there are blog posts from multiple users', function () {
    beforeEach(function () {
      cy.login({
        username: 'masa',
        password: 'salainen',
      });
      cy.createBlog({
        title: 'Masan blogi',
        author: 'Matti Hälvä',
        url: 'www.masanblogit.fi'
      });
      cy.contains('Log Out').click();
      cy.login({
        username: 'sepi',
        password: 'salasana',
      });
      cy.createBlog({
        title: 'Seppo\'s blog post',
        author: 'Seppo Saario',
        url: 'www.sijoitukset.fi'
      });
    });

    it('User can\'t remove another user\'s post', function () {
      cy.contains('Masan blogi')
        .get('#toggleBlogDetails')
        .click();
      cy.get('#removeBlogButton').should('not.exist');
    });

    it.only('Blogs are shown in order of most likes', function () {
      cy.get('li').eq(1).should('contain', 'Seppo\'s blog post');
      cy.get('li').eq(1).contains('View').click();

      cy.get('#likeButton').click();

      cy.get('li').eq(0).should('contain', 'Seppo\'s blog post');
    });
  });
});