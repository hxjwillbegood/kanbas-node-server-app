import model from "./model.js";

export const findAllAssignments = () => model.find();

//fetch assignments checked
export const findAssignmentsByCourseId = (courseId) => {
  return model.find({ course: courseId });
};

//add assignments checked
export const createAssignment = (assignment) => {
    // delete assignment._id; // Ensure no existing _id is passed to avoid conflicts
    return model.create(assignment); // Create and save the new assignment
};

//delete assignments checked
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });

// //find assignmentIndex
// export const findAssignmentIndex = (assignmentId) => model.findAssignmentIndex({ course: courseId });


//update assignment by ID checked
export const updateAssignment = (assignmentId, updatedData) => {
    return model.findByIdAndUpdate(assignmentId, updatedData, { new: true });
};

