export type UserType = 'Individual' | 'Trust' | 'Organization' ;

export interface UserCredentials{
    email: string;
    password: string;
    role: UserType;
}