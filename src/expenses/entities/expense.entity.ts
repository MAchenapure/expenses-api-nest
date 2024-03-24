export class Expense {
    constructor(idUser: string, description: string, value: number, date: Date, day: number, month: number, year: number, category: string, id?: string, createdAt?: Date) {
        this.idUser = idUser;
        this.description = description;
        this.value = value;
        this.date = date;
        this.day = day;
        this.month = month;
        this.year = year;
        this.category = category;
        this.id = id;
        this.createdAt = createdAt;
    }

    id?: string;
    idUser: string;
    description: string;
    value: number;
    date: Date;
    day: number;
    month: number;
    year: number;
    category: string;
    createdAt?: Date;
}