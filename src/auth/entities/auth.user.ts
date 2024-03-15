export class AuthUser {
    constructor(username: string, password: string, id?: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    readonly id: string;
    readonly username: string;
    password: string;
}