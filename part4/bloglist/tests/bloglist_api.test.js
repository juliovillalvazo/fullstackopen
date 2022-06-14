const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');

describe('blogs api tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        await Blog.insertMany(helper.initialBlogs);

        await User.deleteMany({});

        const { username, name, password } = helper.initialUser;
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        helper.initialUser.passwordHash = passwordHash;

        const user = new User({ username, name, passwordHash });
        await user.save();
    });

    describe('when there is initially some blogs saved', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-type', /application\/json/);
        }),
            100000;

        test('all blogs are returned', async () => {
            const res = await api.get('/api/blogs');
            expect(res.body).toHaveLength(helper.initialBlogs.length);
        });

        test('blogs have id property', async () => {
            const res = await api.get('/api/blogs');

            expect(res.body[0].id).toBeDefined();
        });
    });

    describe('viewing a specific blog', () => {
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb();
            const blogToView = blogsAtStart[0];

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

            expect(resultBlog.body).toEqual(processedBlogToView);
        });

        test('fails with statuscode 404 if blog does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId();

            await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
        });

        test('fails with status code 400 if id is invalid', async () => {
            const invalidId = 'aiovgaoi123123';
            await api.get(`/api/blogs/${invalidId}`).expect(400);
        });
    });

    describe('addition of new blogs', () => {
        let token;
        beforeEach(async () => {
            const loginResult = await api
                .post('/api/login')
                .send({ username: 'root', password: 'salainen' })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            token = loginResult.body.token;
        });
        test('a valid blog can be added', async () => {
            const newBlog = {
                title: 'second testing blog',
                author: 'Julio Villalvazo Carrera',
                url: 'www.google.com',
                likes: 1000,
            };

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const blogsAtEnd = await helper.blogsInDb();
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

            const titles = blogsAtEnd.map((r) => r.title);

            expect(titles).toContain('second testing blog');
        });

        test('missing title or url returns 400 bad request', async () => {
            const newBlog = {
                author: 'julio',
                likes: 10,
            };

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(400);
        });

        test('no likes property in post expected 0', async () => {
            const newBlog = {
                title: 'second testing blog',
                author: 'Julio Villalvazo Carrera',
                url: 'www.google.com',
            };

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const blogsAtEnd = await helper.blogsInDb();
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

            const [savedBlog] = blogsAtEnd.filter(
                (r) => r.title === 'second testing blog'
            );

            expect(savedBlog.likes).toBe(0);
        });

        test('No token provided returns 401', async () => {
            // token = '';

            const newBlog = {
                title: 'second testing blog',
                author: 'Julio Villalvazo Carrera',
                url: 'www.google.com',
                likes: 1000,
            };

            const resultBlog = await api
                .post('/api/blogs')

                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            expect(resultBlog.body.error).toContain('invalid token');

            // const blogsAtEnd = await helper.blogsInDb();
            // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        });
    });

    describe('deletion of a blog', () => {
        let token;
        beforeEach(async () => {
            const loginResult = await api
                .post('/api/login')
                .send({ username: 'root', password: 'salainen' })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            token = loginResult.body.token;
        });
        test('succeeds with status code 204 if id is valid', async () => {
            const blogToDelete = {
                title: 'second testing blog',
                author: 'Julio Villalvazo Carrera',
                url: 'www.google.com',
                likes: 1000,
            };

            const createBlogResult = await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(blogToDelete)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const { id } = createBlogResult.body;

            const blogsAtStart = await helper.blogsInDb();

            await api
                .delete(`/api/blogs/${id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204);

            const blogsAtEnd = await helper.blogsInDb();

            expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

            const titles = blogsAtEnd.map((r) => r.title);
            expect(titles).not.toContain(blogToDelete.title);
        });
    });
});

describe('users api tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const { username, name, password } = helper.initialUser;
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        helper.initialUser.passwordHash = passwordHash;

        const user = new User({ username, name, passwordHash });
        await user.save();
    });

    test('succeeds with a fresh name', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'password',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper status code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('Username must be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('invalid user is not created', async () => {
        const usersAtStart = await helper.usersInDb();

        const invalidUser = {
            username: 'ju',
            name: 'julio villalvaz',
            password: 'password',
        };

        const result = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('Invalid username');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });
});

afterAll(() => mongoose.connection.close());
