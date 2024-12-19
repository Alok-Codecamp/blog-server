
// type for name properties of iUser interface 

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}