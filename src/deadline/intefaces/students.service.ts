import { Observable } from 'rxjs';

export class Student {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
export interface IStudent {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
export interface StudentsService {
  getStudentsByEmail(req: {
    emails: string[];
  }): Observable<{ students: IStudent[] }>;
  getStudentByEmail(req: { email: string }): Observable<IStudent>;
}
