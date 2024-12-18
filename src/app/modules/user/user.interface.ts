
// type for name properties of iUser interface 
export type TName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}