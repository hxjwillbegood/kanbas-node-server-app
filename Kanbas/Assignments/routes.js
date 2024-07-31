
import * as daos from "./dao.js";
import { ObjectId } from "mongodb";
export default function AssignmentRoutes(app) {

    //fetch assignments
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const assignments = await daos.findAssignmentsByCourseId(cid);
        // const assignments = db.assignments.filter((m) => m.course === cid);
        res.json(assignments);
    });

    //add assignment
    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new ObjectId(),
        };
        await daos.createAssignment(newAssignment);
        res.send(newAssignment);
      });
    
    //delete assignment
    app.delete("/api/assignments/:mid", async (req, res) => {
        const { mid } = req.params;

        await daos.deleteAssignment(mid);
        // db.assignments = db.assignments.filter((m) => m._id !== mid);
        res.sendStatus(200);
      });
    
    //update assignment
    app.put("/api/assignments/:mid", async (req, res) => {
        const { mid } = req.params;
        const updatedAssignment = await daos.updateAssignment(mid, req.body);
        // const assignmentIndex = await daos.findAssignmentIndex;
        // const assignmentIndex = db.assignments.findIndex(
        // (m) => m._id === mid);
        // db.assignments[assignmentIndex] = {
        // ...db.assignments[assignmentIndex],
        // ...req.body
        // };
        res.sendStatus(204);
    });

    
    


}
