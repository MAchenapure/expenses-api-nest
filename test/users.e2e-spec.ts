import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    const USERS_URL = '/users'
    let authToken = '';
    let idUser = '';

    const getAuthToken = async () => {
        try {
            const AUTH_URL = '/auth';
            const response = await request(app.getHttpServer())
                .post(AUTH_URL)
                .send({
                    username: "admin",
                    password: "admin1234"
                })
            return response.body.auth.access_token;
        }
        catch (err) { console.log(err) }
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        authToken = await getAuthToken();
    });

    describe('Creating new users (POST) /users/create', () => {
        const CREATE_USER_URL = `${USERS_URL}/create`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123',
                    name: 'John',
                    lastname: 'Doe'
                })
                .expect(401);
        });

        it('should create a new user and return 201', async () => {
            const response = await request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123',
                    name: 'John',
                    lastname: 'Doe'
                })
                .expect(201)

            expect(response.body.user).toBeDefined();
            idUser = response.body.user.id;
        });

        it('should return 400 when already exists an user with that email', async () => {
            return await request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123',
                    name: 'John',
                    lastname: 'Doe'
                })
                .expect(400)
        });
    });

    describe('Login (POST) /users/login', () => {
        const LOGIN_USER_URL = `${USERS_URL}/login`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .post(LOGIN_USER_URL)
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123'
                })
                .expect(401);
        });

        it('should return 201 and login', async () => {
            const response = await request(app.getHttpServer())
                .post(LOGIN_USER_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123'
                })
                .expect(201);

            expect(response.body.user).toBeDefined();
        })

        it('should return 400 when user is wrong.', async () => {
            return await request(app.getHttpServer())
                .post(LOGIN_USER_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    email: 'testemail1@gmail.com',
                    password: 'testpassword123'
                })
                .expect(400);
        })

        it('should return 400 when password is wrong.', async () => {
            return await request(app.getHttpServer())
                .post(LOGIN_USER_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword1234'
                })
                .expect(400);
        })
    })

    describe('Deleting user (DELETE) /users/delete', () => {
        const DELETE_USER_URL = `${USERS_URL}/delete`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .delete(`${DELETE_USER_URL}/${idUser}`)
                .expect(401);
        });

        it('should delete an existing user.', async () => {
            const response = await request(app.getHttpServer())
                .delete(`${DELETE_USER_URL}/${idUser}`)
                .auth(authToken, { type: 'bearer' })
                .expect(200);

            expect(response.body.user).toBeDefined();
        });

        it('should return 400 when trying to delete an unexisting user.', async () => {
            return await request(app.getHttpServer())
                .delete(`${DELETE_USER_URL}/${idUser}`)
                .auth(authToken, { type: 'bearer' })
                .expect(400);
        });

    })

    afterAll(async () => {
        await app.close();
    });
})

