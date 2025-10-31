export class User {
    public login: string;
    public id: string | null;
    public date: Date;

    public constructor(login: string, id: string, date: Date) {
        this.login = login;
        this.id = id;
        this.date = date;
    }
}