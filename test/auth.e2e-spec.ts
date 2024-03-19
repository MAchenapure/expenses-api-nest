import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    const AUTH_URL = '/auth';
    let authToken = '';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    describe('Authentication (GET) /auth', () => {
        it('should auth.', async () => {
            const response = await request(app.getHttpServer())
                .post(AUTH_URL)
                .send({
                    username: "admin",
                    password: "admin1234"
                })
                .expect(201)

            expect(response.body.code).toEqual(0);
            expect(response.body.auth).toBeDefined();
            expect(response.body.auth.access_token).toBeDefined();

            authToken = response.body.auth.access_token;
        });
    })

    describe('Create authentication user (POST) /auth/create', () => {
        it('should return 201 but response.code = 1 when already exists an user with that email.', async () => {
            const response = await request(app.getHttpServer())
                .post(AUTH_URL + '/create')
                .auth(authToken, { type: 'bearer' })
                .send({
                    username: "admin",
                    password: "admin1234"
                })
                .expect(201)

            expect(response.body.code).toEqual(1);
        })

        it('should return 401 when auth token is not provided.', async () => {
            const response = await request(app.getHttpServer())
            .post(AUTH_URL + '/create')
            .send({
                username: "admin",
                password: "admin1234"
            })
            .expect(401)
        })
    })

    afterAll(async () => {
        await app.close();
    })
})
