const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { adminAuthorization } = require("../middleware/adminAuthorization");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    deleteProjectImage,
    addProjectImage,
} = require("../controller/projects");
const convertToArray = require("../middleware/convertToArray");

router
    .route("/")
    .get(getProjects)
    .post(
        adminAuthorization,
        upload.array("images"),
        convertToArray("service"),
        createProject
    );

router
    .route("/:id")
    .get(getProjectById)
    .put(adminAuthorization, updateProject)
    .delete(adminAuthorization, deleteProject);

router
    .route("/:projectId/image")
    .put(adminAuthorization, upload.array("images"), addProjectImage)
    .delete(adminAuthorization, deleteProjectImage);


module.exports = router;
