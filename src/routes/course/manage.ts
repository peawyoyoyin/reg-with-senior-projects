import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getSectionEnrolled(studentID) {
  const sectionRows = await db.section.query(
    `
      SELECT courseID, name as courseName, sectionNumber as section FROM study
      JOIN section ON study.sectionId = section.id
      JOIN course_instance ON section.courseInstanceId = course_instance.id
      JOIN course ON course_instance.courseCourseID = course.courseID
      JOIN semester ON course_instance.semesterId = semester.id
      WHERE semester.id = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
      AND studentStudentID = ?
    `,
    [studentID]
  )
  if (sectionRows.length === 0) {
    throw new Error('Cannot found section enrolled')
  }
  return sectionRows
}

router.get('/', async (req: any, res) => {
  let studentData
  const student = req.user
  const { studentID } = student
  try {
    console.log(student)
    const subjects = await getSectionEnrolled(studentID)
    const { firstName, lastName } = student
    studentData = {
      info: {
        studentID,
        firstName,
        lastName
      },
      subjects
    }
  } catch (e) {
    studentData = {
      info: {
        studentID,
        notFound: e.message
      }
    }
  }

  res.render('course/manage', {
    title: 'Manage Courses',
    studentData,
    studentID
  })
})

async function handleRemove(body) {
  let { studentID, remove } = body
  if (remove === undefined) return []
  if (typeof remove === 'string') {
    remove = [remove]
  }
  const resultPromises = remove.map(rm => removePromise(rm, studentID))
  const results = await resultPromises
  const e = results.filter(r => r instanceof Error).map(e => e.map)
  if (e.length > 0) return e
  return []
}

async function removePromise(courseID: string, studentID: string) {
  const [{ id }] = await db.courseInstance.query(
    `
    SELECT id FROM course_instance CI
    WHERE courseCourseID = ? 
    AND semesterId = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
  `,
    [courseID]
  )
  return await db.study.query(
    `
    DELETE S FROM study S
    JOIN section ON S.sectionId = section.id
    JOIN course_instance ON section.courseInstanceId = course_instance.id
    JOIN course ON course_instance.courseCourseID = course.courseID
    WHERE course_instance.id = ? AND S.studentStudentID = ?;
    `,
    [id, studentID]
  )
}

const getLastRemovalDateOfLatestSemester = async () => {
  const queryResult = await db.semester.query(`
    SELECT lastSubjectRemovalDate FROM semester
    WHERE id = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
  `)
  return queryResult[0].lastSubjectRemovalDate
}

router.post('/', async (req, res) => {
  console.log(req.body)
  if(req.query.forceRemove) {
    const e = await handleRemove(req.body)
  } else {
    const lastRemovalDate = await getLastRemovalDateOfLatestSemester()
    console.log('lastremovaldate', lastRemovalDate)
    const now = new Date()
    console.log(lastRemovalDate.getTime() > now.getTime() ? 'more than' : 'less than')
  }
  // if (e.length > 0) res.render('')
  res.redirect(req.baseUrl)
})

export default router
