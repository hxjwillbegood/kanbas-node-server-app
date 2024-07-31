import model from "./model.js";

// Fetch all modules
export const findAllModules = () => model.find();

// Fetch modules by course ID
export const findModulesByCourseId = (courseId) => {
    return model.find({ course: courseId });
};

// Add a new module
export const createModule = (module) => {
    return model.create(module); // Create and save the new module
};

// Delete a module by ID
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

// Update a module by ID
export const updateModule = (moduleId, updatedData) => {
    return model.findByIdAndUpdate(moduleId, updatedData, { new: true });
};