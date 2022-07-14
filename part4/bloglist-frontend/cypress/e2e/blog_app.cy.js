describe('Blog App', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Superuser',
            username: 'root',
            password: 'password',
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');
    });
    it('blogs app renders correctly', () => {
        cy.contains('blogs');
        cy.contains('Log in to application to see the blogs');
    });

    it('Login form is shown', function () {
        cy.get('#username');
        cy.get('#password');
        cy.get('#login-button');
    });

    describe('login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('root');
            cy.get('#password').type('password');
            cy.get('#login-button').click();

            cy.get('.success')
                .should('contain', 'Successfully logged in as root')
                .and('have.css', 'color', 'rgb(42, 217, 109)')
                .and('have.css', 'border-style', 'solid');
        });

        it('fails with incorrect credentials', function () {
            cy.get('#username').type('julio');
            cy.get('#password').type('password');
            cy.get('#login-button').click();

            cy.get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(223, 38, 38)')
                .and('have.css', 'border-style', 'solid');
        });
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'password' });
        });

        it('a blog can be created', function () {
            cy.get('#new-blog').click();
            cy.contains('Create new');
            cy.get('#title').type('test blog');
            cy.get('#author').type('test author');
            cy.get('#url').type('test url');

            cy.get('#create-blog').click();

            cy.get('.success')
                .should(
                    'contain',
                    'A new blog test blog by test author was added'
                )
                .and('have.css', 'color', 'rgb(42, 217, 109)')
                .and('have.css', 'border-style', 'solid');

            cy.get('html').should('contain', 'test blog test author');
            cy.contains('show');
        });

        describe('when a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'test title',
                    author: 'test author',
                    url: 'test url',
                });
            });

            it('posts can be liked', function () {
                cy.get('#show-details').click();
                cy.get('#likes-button').click();
                cy.get('#likes-count').should('contain', '1');
            });

            describe('deleting a blog', function () {
                beforeEach(function () {
                    const user = {
                        name: 'second',
                        username: 'testuser',
                        password: 'password',
                    };
                    cy.request('POST', 'http://localhost:3003/api/users', user);
                    cy.visit('http://localhost:3000');
                });
                it('post created by the same user can be deleted', function () {
                    cy.get('#show-details').click();
                    cy.get('#remove-btn').click();

                    cy.get('html').should(
                        'not.contain',
                        'test title test author'
                    );
                });

                it('other users can not remove others blogs', function () {
                    cy.get('#logout').click();
                    cy.get('html').should('not.contain', 'logged in');

                    cy.login({ username: 'testuser', password: 'password' });

                    cy.contains('second logged in');
                    cy.get('#show-details').click();
                    cy.get('.blog').should('not.contain', 'remove');
                });
            });
        });

        describe.only('when multiple blogs exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'the second',
                    author: 'test author',
                    url: 'test url',
                    likes: 1000,
                });

                cy.createBlog({
                    title: 'the last',
                    author: 'test author',
                    url: 'test url',
                    likes: 999,
                });

                cy.createBlog({
                    title: 'the first',
                    author: 'test author',
                    url: 'test url',
                    likes: 1001,
                });
            });

            it('blogs are sorted by the most amount of likes', function () {
                cy.get('.blog').eq(0).should('contain', 'the first');
                cy.get('.blog').eq(1).should('contain', 'the second');
                cy.get('.blog').eq(2).should('contain', 'the last');

                cy.get('.blog').eq(2).contains('show').click();

                cy.get('#likes-button').click();
                cy.wait(500);
                cy.get('#likes-button').click();
                cy.wait(500);
                cy.get('#likes-button').click();

                cy.get('.blog').eq(0).should('contain', 'the last');
            });
        });
    });
});
