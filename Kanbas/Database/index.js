import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import grades from "./grades.js";
import enrollments from "./enrollments.js";

//用javascript不用json的是因为json可以在local运行 但不一定能在aws等其他render server上运行

export default { courses, modules, assignments, users, grades, enrollments };