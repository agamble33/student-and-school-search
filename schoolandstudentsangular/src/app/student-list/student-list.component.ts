import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { STUDENTS } from '../mock-students';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  students = STUDENTS;

  selectedStudents: Student;

  constructor(private studentService: StudentService) { }



  ngOnInit() {
    this.getStudents
  }
 onSelect(student: Student): void {
    this.selectedStudent = student;
}

   getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.studentService.addStudent({ name } as Student)
      .subscribe(student => {
        this.students.push(student);
      });

}

 delete(student: Student): void {
    this.students = this.students.filter(h => h !== students\);
    this.studentService.deleteStudent(student).subscribe();
   }
  }