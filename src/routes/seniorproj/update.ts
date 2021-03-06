import * as express from 'express'
import { check, validationResult } from 'express-validator/check'
import db from '~/db'

const router = express.Router()

router.get('/', async (req: any, res) => {
  const rawTypes = await getAllEvaluationType()
  const types = formatTypes(rawTypes)
  const { renderOptions } = req
  res.render('seniorproj/update', {
    title: 'Update Senior Project Status',
    types,
    errors: [],
    ...renderOptions,
  })
})

router.post(
  '/',
  [
    check('grade')
      .isNumeric()
      .withMessage('Grade must be a number')
  ],
  async (req, res) => {
    console.log(req.body)
    // console.log(validationResult(req).array())
    const { teacherID } = req.user
    const { projectID, type, grade, comment } = req.body
    const errors = validationResult(req)
      .array()
      .map((e: any) => e.msg)

    try {
      await getProject(projectID)
    } catch (e) {
      errors.push(e.message)
    }
    try {
      if (errors.length === 0) {
        await createEvaluation(projectID, teacherID, type, comment, grade)
        res.redirect('/student')
      } else throw new Error()
    } catch (e) {
      const rawTypes = await getAllEvaluationType()
      const types = formatTypes(rawTypes)
      const { renderOptions } = req
      res.render('seniorproj/update', {
        title: 'Update Senior Project Status',
        types,
        errors,
        ...renderOptions,
      })
    }
  }
)

function formatTypes(types) {
  return types.map(type => ({
    text: type.description,
    value: type.typeID,
  }))
}

async function getAllEvaluationType() {
  const rawTypes = await db.evaluationType.query(`
    SELECT * FROM evaluation_type
  `)
  return rawTypes
}

async function getTeacher(teacherID) {
  const rawTeacher = await db.teacher.query(
    `
    SELECT * FROM teacher
    WHERE teacherID = ?
    `,
    [teacherID]
  )
  if (rawTeacher.length === 0) throw new Error('Cannot find teacher')
  return rawTeacher[0]
}

async function getProject(projectID) {
  const rawProject = await db.seniorProject.query(
    `
    SELECT * FROM senior_project
    WHERE projectID = ?
    `,
    [projectID]
  )
  if (rawProject.length === 0) throw new Error('Cannot find project')
  return rawProject[0]
}

async function createEvaluation(projectID, teacherID, typeID, comment, grade) {
  const result = await db.evaluation.query(
    `
    insert into evaluation(comment,grade,projectProjectID,evaluationTypeTypeID,evaluatorTeacherID)
    value(?, ?, ?, ?, ?)
    `,
    [comment, grade, projectID, typeID, teacherID]
  )
}

export default router
