import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const getAuthToken = async (app: INestApplication) => {
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
