import { Exclude } from "class-transformer";

export class User {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    createdAt: Date;
}