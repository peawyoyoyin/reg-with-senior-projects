import { Repository } from 'typeorm'
import DB from './index'

import { Faculty } from '~/entity/faculty'
import { Department } from '~/entity/department'
import { Course } from '~/entity/course'
import { AcademicYear } from '~/entity/academic-year'
import { Semester } from '~/entity/semester'
import { StudentGroup } from '~/entity/student-group'
import { CourseInstance } from '~/entity/course-instance'
import { Teacher } from '~/entity/teacher'
import { Section } from '~/entity/section'
import { SeniorProject } from '~/entity/senior-project'
import { Student } from '~/entity/student'
import { Study } from '~/entity/study.relation'
import { GroupYearRelation } from '~/entity/group-year.relation'
import { EnrollmentFeePayment } from '~/entity/enrollment-fee-payment'
import { EvaluationType } from '~/entity/evaluation-type'

const seed = async () => {
  async function deleteAll<T>(repository: Repository<T>) {
    await repository
      .createQueryBuilder()
      .delete()
      .execute()
    }

  await deleteAll(DB.faculty)
  await deleteAll(DB.departments)
  await deleteAll(DB.student)
  await deleteAll(DB.course)
  await deleteAll(DB.courseInstance)
  await deleteAll(DB.academicYear)
  await deleteAll(DB.study)
  await deleteAll(DB.semester)
  await deleteAll(DB.section)
  await deleteAll(DB.teacher)
  await deleteAll(DB.seniorProject)
  await deleteAll(DB.studentGroup)

  const faculty = [
    new Faculty({
      facultyID: '1234',
      name: 'Engineer',
    }),
    new Faculty({
      facultyID: '5678',
      name: 'Accounting',
    })
  ]

  const department = [
    new Department({
      name: 'Computer Engineering',
      faculty: faculty[0],
    }),
    new Department({
      name: 'Electrical Engineering',
      faculty: faculty[0],
    }),
    new Department({
      name: 'Civil Engineering',
      faculty: faculty[0],
    })
  ]

  const student = [
    new Student({
      studentID: '6156789021',
      password: 'password',
      firstName: 'Jame',
      lastName: 'Fast',
      citizenID: '9871234560123',
      nationality: 'TH',
      department: department[0],
    }),
    new Student({
      studentID: '5831645895',
      password: 'password',
      firstName: 'Un',
      lastName: 'Kim-Jong',
      citizenID: '9876543210123',
      nationality: 'KR',
      department: department[0],
    }),
    new Student({
      studentID: '5984651325',
      password: 'password',
      firstName: 'Mark',
      lastName: 'Antony',
      citizenID: '9816483210123',
      nationality: 'IT',
      department: department[1],
    }),
    new Student({
      studentID: '6012535648',
      password: 'password',
      firstName: 'Julius',
      lastName: 'Caesar',
      citizenID: '9875846910123',
      nationality: 'IT',
      department: department[1],
    }),
    new Student({
      studentID: '6154489021',
      password: 'password',
      firstName: 'Dick',
      lastName: 'Johnson',
      citizenID: '9876541234563',
      nationality: 'US',
      department: department[1],
    })
  ]

  const course = [
    new Course({
      courseID: '2110201',
      credit: 3,
      abbreviate: 'COMP ENG MATH',
      name: 'COMPUTER ENGINEERING MATHEMATICS',
    }),
    new Course({
      courseID: '2110332',
      credit: 3,
      abbreviate: 'SYS ANALYSIS DSGN',
      name: 'SYSTEMS ANALYSIS AND DESIGN',
    }),
    new Course({
      courseID: '3108406',
      credit: 1,
      abbreviate: 'LAB DOG CAT REPROD',
      name: 'LABORATORY IN DOG AND CAT REPRODUCTION',
    })
  ]

  const academicYear = [
    new AcademicYear({
      year: 2558,
    }),
    new AcademicYear({
      year: 2559,
    }),
    new AcademicYear({
      year: 2560,
    }),
    new AcademicYear({
      year: 2561,
    })
  ]
  student[0].year = academicYear[2]
  student[1].year = academicYear[0]
  student[2].year = academicYear[0]
  student[3].year = academicYear[1]
  student[4].year = academicYear[2]


  const semester = [
    new Semester({
      semesterNumber: 1,
      startDate: new Date(2561, 8, 14),
      endDate: new Date(2561, 12, 19),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date(),
    }),
    new Semester({
      semesterNumber: 2,
      startDate: new Date(2562, 1, 7),
      endDate: new Date(2562, 5, 22),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date(),
    }),
    new Semester({
      semesterNumber: 3,
      startDate: new Date(2562, 6, 3),
      endDate: new Date(2562, 8, 9),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date(),
    }),
    new Semester({
      semesterNumber: 1,
      startDate: new Date(2561, 6, 3),
      endDate: new Date(2561, 8, 9),
      year: academicYear[1],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date(),
    })
  ]

  const courseInstance = [
    new CourseInstance({
      semester: semester[2],
      course: course[0],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[1],
      course: course[0],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[0],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[0],
      course: course[1],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[1],
      course: course[1],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[2],
      course: course[1],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[1],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[2],
      course: course[2],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[2],
      midterm: '2018-05-12 13:00-16:00',
      final: '2018-08-12 13:00-16:00',
    }),
  ]
  console.log(courseInstance[0].semester)

  const studentGroup = [
    new StudentGroup({
      groupID: 1,
      description: 'group 1',
    }),
    new StudentGroup({
      groupID: 2,
      description: 'group 2',
    }),
    new StudentGroup({
      groupID: 3,
      description: 'group 3',
    }),
  ]
  student[0].studentGroup = studentGroup[0]
  student[3].studentGroup = studentGroup[1]

  const teacher = [
    new Teacher({
      teacherID: '1234567',
      password: 'password',
      firstName: 'PRABHAS',
      lastName: 'CHONGSTITVATANA',
      abbrName: 'PCS',
      citizenID: '1234567890123',
    }),
    new Teacher({
      teacherID: '0000000',
      password: 'password',
      firstName: 'ATTAWITH',
      lastName: 'SUDSANG',
      abbrName: 'ATS',
      citizenID: '0000000000000',
    }),
    new Teacher({
      teacherID: '1111111',
      password: 'password',
      firstName: 'JOHN',
      lastName: 'CENA',
      abbrName: 'JCN',
      citizenID: '1111111111111',
    })
  ]

  const section = [
    new Section({
      id: 1,
      capacity: 40,
      sectionNumber: 1,
      courseInstance: courseInstance[0],
      time: 'MO 9:00-12:00',
      teacher: teacher[0],
    }),
    new Section({
      id: 2,
      capacity: 30,
      sectionNumber: 2,
      courseInstance: courseInstance[0],
      time: 'TU 13:00-16:00',
      teacher: teacher[1],
    }),
    new Section({
      id: 3,
      capacity: 40,
      sectionNumber: 33,
      courseInstance: courseInstance[0],
      time: 'WE 13:00-16:00',
      teacher: teacher[0],
    }),
    new Section({
      id: 4,
      capacity: 40,
      sectionNumber: 1,
      courseInstance: courseInstance[5],
      time: 'TH 13:00-16:00',
      teacher: teacher[0],
    }),
    new Section({
      id: 5,
      capacity: 50,
      sectionNumber: 2,
      courseInstance: courseInstance[5],
      time: 'FR 09:00-12:00',
      teacher: teacher[1],
    }),
  ]

  const seniorProject = [
    new SeniorProject({
      topic: 'Computer',
      year: 2560,
    }),
    new SeniorProject({
      topic: 'Electronic',
      year: 2561,
    }),
    new SeniorProject({
      topic: 'Hardware',
      year: 2561,
    }),
  ]

  const study = [
    new Study({
      section: section[0],
      gradeLetter: 'A',
      student: student[0],
      instance: courseInstance[0],
    }),
    new Study({
      section: section[3],
      gradeLetter: 'W',
      student: student[0],
      instance: courseInstance[5],
    }),
    new Study({
      section: section[1],
      gradeLetter: 'C+',
      student: student[4],
      instance: courseInstance[0],
    })
  ]

  const enrollmentFeePayment = [
    new EnrollmentFeePayment({
      amount: 300000,
    })
  ]
  enrollmentFeePayment[0].payer = student[3]
  enrollmentFeePayment[0].semester = semester[1]

  const gyr = [
    new GroupYearRelation({
      studentGroup: studentGroup[0],
      fee: 200,
      relationID: 1,
      summerFee: 300,
      year: academicYear[0],
    }),
    new GroupYearRelation({
      studentGroup: studentGroup[1],
      fee: 201,
      relationID: 2,
      summerFee: 301,
      year: academicYear[1],
    }),
  ]

  const evaluationType = [
    new EvaluationType({
      description: 'first progress report',
      weight: 20,
    }),
    new EvaluationType({
      description: 'second progress report',
      weight: 20,
    }),
    new EvaluationType({
      description: 'final report',
      weight: 60,
    }),
  ]

  student.forEach(student => student.supervisor = teacher[0])

  await DB.evaluationType.save(evaluationType)
  await DB.academicYear.save(academicYear)
  await DB.studentGroup.save(studentGroup)
  await DB.faculty.save(faculty)
  await DB.departments.save(department)
  await DB.teacher.save(teacher)
  await DB.student.save(student)
  await DB.course.save(course)
  await DB.semester.save(semester)
  await DB.courseInstance.save(courseInstance)
  await DB.section.save(section)
  await DB.seniorProject.save(seniorProject)
  await DB.study.save(study)
  await DB.groupYearRelation.save(gyr)
  await DB.enrollmentFeePayment.save(enrollmentFeePayment)
}
export default seed
