export type UserType = 'Individual' | 'Trust' | 'Company' ;

export interface UserCredentials{
    email: string;
    password: string;
    role: UserType;
}