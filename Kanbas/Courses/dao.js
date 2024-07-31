import model from "./model.js";

export const findAllCourses = () => model.find();

//fetch courses 
export const findCoursesByCourseId = (courseId) => {
  return model.find({ course: courseId });
};

//add courses  
export const createCourse = (course) => {
    // delete assignment._id; // Ensure no existing _id is passed to avoid conflicts
    return model.create(course); // Create and save the new assignment
};

// Find a course by its number
export const findCoursesByCourseNumber = (number) => model.findOne({ number })

//delete courses
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

//update courses by ID  
export const updateCourse = (courseId, updatedData) => {
    return model.findByIdAndUpdate(courseId, updatedData, { new: true });
};

