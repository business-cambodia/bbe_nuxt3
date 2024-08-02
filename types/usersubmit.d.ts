import { IUserRole } from './userrole';

export interface IUserSubmit {
id: number;
name: string;
email: string;
phone: string
address: string;
Gender: string;
userrole: IUserRole;
}