import * as daos from "./dao.js";
import { ObjectId } from "mongodb";

export default function ModuleRoutes(app) {
    // Fetch modules by course ID
    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const modules = await daos.findModulesByCourseId(cid);
        res.json(modules);
    });

    // Add a new module
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new ObjectId(),
        };
        await daos.createModule(newModule);
        res.send(newModule);
    });

    // Update a module by ID
    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const updatedModule = await daos.updateModule(mid, req.body);
        res.sendStatus(204);
    });

    // Delete a module by ID
    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        await daos.deleteModule(mid);
        res.sendStatus(200);
    });
}