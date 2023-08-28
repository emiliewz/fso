describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Emilie',
      username: 'user1',
      password: 'user1pwd'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('user1pwd')
      cy.get('#login-button').click()

      cy.contains('Emilie logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('user1')
      cy.get('#login-button').click()

      cy.get('.msg').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Emilie logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'user1pwd' })
    })

    it.only('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#note-title').type('this is a new blog')
      cy.get('#note-author').type('Emilie')
      cy.get('#note-url').type('localhost:5173')

      cy.contains('create').click()
      cy.get('html').should('contain', 'this is a new blog')
      cy.get('.msg').should('contain', 'a new blog this is a new blog by Emilie added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

})