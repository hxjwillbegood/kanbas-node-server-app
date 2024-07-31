// import Database from "../Database/index.js";
import * as daos from "./dao.js";
import { ObjectId } from "mongodb";
export default function CourseRoutes(app) {

  //fetch course
  app.get("/api/courses", async (req, res) => {
    const courses = await daos.findAllCourses();
    res.send(courses);
  });

  function generateRandomCourseNumber(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  //create new course
  app.post("/api/courses", async (req, res) => {
    let number = generateRandomCourseNumber();
    const course = { 
      ...req.body,
      number,
      _id: new ObjectId()};
      const createdCourse = await daos.createCourse(course); 
    res.send(createdCourse);
  });


  app.delete("/api/courses/:number", async (req, res) => {
    const { number } = req.params;
  
    try {
      // Find the course by its number
      const course = await daos.findCoursesByCourseNumber(number);
      
      // If course is not found, return a 404 error
      if (!course) {
        return res.status(404).send({ error: "Course not found." });
      }
  
      // Delete the course using its _id
      await daos.deleteCourse(course._id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //update couse
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    const updatedAssignment = await daos.updateCourse(id, course);

    // Database.courses = Database.courses.map((c) =>
    //   c._id === id ? { ...c, ...course } : c
    // );

    res.sendStatus(204);
  });

}
