import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { StudentGroup } from './student-group'
import { EnrollmentFeePayment } from './enrollment-fee-payment'
import { Teacher } from './teacher'
import { Department } from './department'
import { Section } from './section'
import { Study } from './study';

@Entity()
export class Student {
  @PrimaryColumn({type: 'varchar', length: 10})
  studentID: string

  @Column({type: 'varchar', length: 30})
  firstName: string

  @Column({type: 'varchar', length: 30})
  lastName: string

  @Column('int')
  year: number

  @Column({type: 'varchar', length: 2})
  nationality: string

  @Column({type: 'varchar', length: 13})
  citizenID: string

  @OneToMany(type => EnrollmentFeePayment, payment => payment.payer)
  payments: EnrollmentFeePayment[]

  @ManyToOne(type => StudentGroup, studentGroup => studentGroup.students, {onDelete: 'SET NULL'})
  studentGroup: StudentGroup

  @ManyToOne(type => Teacher, teacher => teacher.studentsUnderSupervision, {onDelete: 'SET NULL'})
  supervisor: Teacher

  @ManyToOne(type => Department, department => department.students, {onDelete: 'SET NULL'})
  department: Department

  @ManyToMany(type => Section, section => section.students)
  sections: Section[]

  @OneToMany(type => Study, study => study.student)
  studies: Study[] 
}
