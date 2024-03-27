import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { getAuthToken } from "./get-auth-token";
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let authToken = '';
    let idExpense = '';
    const EXPENSES_URL = '/expenses';
    const USER_ID = '65fc940bc7627b24e4968391'; // Test user.

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        authToken = await getAuthToken(app);
    })

    describe('Creating new expenses (POST) /expenses/create', () => {
        const CREATE_EXPENSES_URL = `${EXPENSES_URL}/create`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .post(CREATE_EXPENSES_URL)
                .send({
                    idUser: USER_ID,
                    description: 'Testing expenses.',
                    value: 999999,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(401)
        })

        it('should create a new expense and return 201.', async () => {
            const response = await request(app.getHttpServer())
                .post(CREATE_EXPENSES_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    idUser: USER_ID,
                    description: 'Testing expenses.',
                    value: 999999,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(201)

            expect(response.body.expenses).toBeDefined();
            idExpense = response.body.expenses.id;
        })

        it('should return 400 when sending an non-existent User ID.', async () => {
            return await request(app.getHttpServer())
                .post(CREATE_EXPENSES_URL)
                .auth(authToken, { type: 'bearer' })
                .send({
                    idUser: '65fc940bc7627b24e4968390',
                    description: 'Testing expenses.',
                    value: 999999,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(400)
        })
    })

    describe('Getting an existing expense (GET) /expenses/get ', () => {
        const GET_EXPENSES_URL = `${EXPENSES_URL}/get`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .get(`${GET_EXPENSES_URL}/${idExpense}`)
                .expect(401)
        })

        it('should return the expense and code 200.', async () => {
            const response = await request(app.getHttpServer())
                .get(`${GET_EXPENSES_URL}/${idExpense}`)
                .auth(authToken, { type: 'bearer' })
                .expect(200)

            expect(response.body.expenses).toBeDefined();
        })

        it('should return 400 when sending an non-existent Expense ID.', async () => {
            return await request(app.getHttpServer())
                .get(`${GET_EXPENSES_URL}/000000000000000000000000`)
                .auth(authToken, { type: 'bearer' })
                .expect(400)
        })
    })

    describe('Updating an existing expense (PUT) /expenses/update ', () => {
        const UPDATE_EXPENSES_URL = `${EXPENSES_URL}/update`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .put(`${UPDATE_EXPENSES_URL}/${idExpense}`)
                .expect(401)
        })

        it('should return the expense and code 201.', async () => {
            const response = await request(app.getHttpServer())
                .put(`${UPDATE_EXPENSES_URL}/${idExpense}`)
                .auth(authToken, { type: 'bearer' })
                .send({
                    idUser: USER_ID,
                    description: 'Testing expenses update.',
                    value: 111111,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(200)

            expect(response.body.expenses).toBeDefined();
        })

        it('should return 400 when sending an non-existent Expense ID.', async () => {
            return await request(app.getHttpServer())
                .put(`${UPDATE_EXPENSES_URL}/000000000000000000000000`)
                .auth(authToken, { type: 'bearer' })
                .send({
                    idUser: USER_ID,
                    description: 'Testing expenses update.',
                    value: 111111,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(400)
        })

        it('should return 400 when sending an non-existent User ID.', async () => {
            return await request(app.getHttpServer())
                .put(`${UPDATE_EXPENSES_URL}/${idExpense}`)
                .auth(authToken, { type: 'bearer' })
                .send({
                    idUser: '65fc940bc7627b24e496839e',
                    description: 'Testing expenses update.',
                    value: 111111,
                    date: Date.now(),
                    category: 'Test'
                })
                .expect(400)
        })
    })

    describe('Deleting an existing expense (DELETE) /expenses/get ', () => {
        const DELETE_EXPENSES_URL = `${EXPENSES_URL}/delete`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .delete(`${DELETE_EXPENSES_URL}/${idExpense}`)
                .expect(401)
        })

        it('should return the expense and code 200.', async () => {
            const response = await request(app.getHttpServer())
                .delete(`${DELETE_EXPENSES_URL}/${idExpense}`)
                .auth(authToken, { type: 'bearer' })
                .expect(200)

            expect(response.body.expenses).toBeDefined();
        })

        it('should return 400 when sending an non-existent Expense ID.', async () => {
            return await request(app.getHttpServer())
                .delete(`${DELETE_EXPENSES_URL}/000000000000000000000000`)
                .auth(authToken, { type: 'bearer' })
                .expect(400)
        })
    })

    describe("Getting all user's expenses (GET) /expenses/user ", () => {
        const GET_USER_EXPENSES_URL = `${EXPENSES_URL}/user`;

        it('should return 401 when auth token is not provided.', async () => {
            return await request(app.getHttpServer())
                .get(`${GET_USER_EXPENSES_URL}/${idExpense}`)
                .expect(401)
        })

        it('should return the expense and code 200.', async () => {
            const response = await request(app.getHttpServer())
                .get(`${GET_USER_EXPENSES_URL}/${USER_ID}`)
                .auth(authToken, { type: 'bearer' })
                .expect(200)

            expect(response.body.expenses).toBeDefined();
        })

        it('should return 400 when sending an non-existent User ID.', async () => {
            return await request(app.getHttpServer())
                .get(`${GET_USER_EXPENSES_URL}/000000000000000000000000`)
                .auth(authToken, { type: 'bearer' })
                .expect(400)
        })
    })

    afterAll(async () => {
        await app.close();
    })
})
