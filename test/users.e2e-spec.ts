import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const AUTH_TOKEN = '';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    describe('Creating new users (POST) /users/create', () => {
        const CREATE_USER_URL = '/users/create';

        it('should create a new user', () => {
            return request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .send({
                    email: 'testemail@gmail.com',
                    password: 'testpassword123',
                    name: 'John',
                    surname: 'Doe'
                })
                .expect(201)
        });

        it('should return 201 but response.code = 1 when already exists user with that email', () => {
            
        })
    })
})

