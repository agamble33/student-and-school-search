import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Student } from './student';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class StudentService {
 
  private studentsUrl = 'api/students';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
 
  getStudents (): Observable<Students[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(students => this.log('fetched students')),
        catchError(this.handleError('getStudents', []))
      );
  }
 
 
  getHeroNo404<Data>(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/?id=${id}`;
    return this.http.get<Students[]>(url)
      .pipe(
        map(students => students[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} student id=${id}`);
        }),
        catchError(this.handleError<student>(`getStudent id=${id}`))
      );
  }
 

  getStudent(id: number): Observable<Student> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }
 

  searchStudents(term: string): Observable<Students[]> {
    if (!term.trim()) {
   
      return of([]);
    }
    return this.http.get<Student[]>(`${this.studentsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found students matching "${term}"`)),
      catchError(this.handleError<Studnet[]>('searchStudents', []))
    );
  }
 

  addStudent (student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
      tap((student: Student) => this.log(`added student w/ id=${student.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }
 
  
  deleteStudent (Student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
 
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }
 

  updateStudent (student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }
 

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 

      console.error(error); // log to console instead
 

      this.log(`${operation} failed: ${error.message}`);
 

      return of(result as T);
    };
  }
 
 
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}