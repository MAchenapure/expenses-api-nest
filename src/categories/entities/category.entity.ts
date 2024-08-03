export class Category {
    constructor(description: string, id?: string, idUser?: string, isDefault?: boolean) {
        this.id = id;
        this.idUser = idUser !== undefined ? idUser : '0';
        this.isDefault = isDefault !== undefined ? isDefault : false;
        this.description = description;
    }

    id?: string;
    idUser?: string;
    description: string;
    isDefault: boolean;
}