import db from "../Database/index.js";
export default function AssignmentRoutes(app) {
    //fetch assignments
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((m) => m.course === cid);
        res.json(assignments);
    });

    //add assignment
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });
    
    //delete assignment
    app.delete("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        db.assignments = db.assignments.filter((m) => m._id !== mid);
        res.sendStatus(200);
      });
    
    //update assignment
    app.put("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
        (m) => m._id === mid);
        db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body
        };
        res.sendStatus(204);
    });

    
    


}
