const fileUpload = require("express-fileupload");
require("dotenv").config();
const Project = require("../models/project");
const blobServiceClient = require("../azure/azureStorage");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const createProject = async (req, res) => {
    // return res.json({a:req.body,b:req.files});

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }

    const nameExist = await Project.findOne({ name: req.body.name });
    if (nameExist) {
        throw new BadRequestError("Project name already exist");
    }

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.SABMAF_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    req.body.images = images;

    const project = await Project.create(req.body);

    res.status(201).json({
        message: "Project created successfully",
        project,
    });
};

const getProjects = async (req, res) => {
    // get name query from request
    const { name, services, displayAtHome } = req.query;

    // create a query object to filter result and for search attribute add admin to it
    const queryObject = {};

    // if name is provided in request query add to query object
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    // If services is provided in request query add to query object
    if (services) {
        queryObject.services = services;
    }
    if (displayAtHome) {
        queryObject.displayAtHome = displayAtHome;
    }

    // get projects for admin
    let result = Project.find(queryObject)
        .sort("createdAt")
        .select("-admin -createdAt -updatedAt -__v");

    // #################################################################
    // Set up Pagination

    // set limit and page(from query) variable
    const limit = Number(req.query.limit) || 30;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // edit projects based on limit and page
    result = result.skip(skip).limit(limit);

    // #################################################################
    // Send final projects

    const projects = await result;

    res.json({ nbHits: projects.length, projects });
};

const getProjectById = async (req, res) => {
    // get project id from request params
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid project id");
    }

    // get project by id
    const project = await Project.findById(id).select(
        "-admin -createdAt -updatedAt -__v"
    );

    // if project not found throw error
    if (!project) {
        throw new NotFoundError("Project not found");
    }

    // send project
    res.json(project);
};

const deleteProject = async (req, res) => {
    // get project id from request params
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid project id");
    }

    // find project by id and delete
    const project = await Project.findById(id);

    // if project not found throw error
    if (!project) {
        throw new NotFoundError("Project not found");
    }

    // Delete images from azure blob storage
    const containerName = process.env.SABMAF_IMAGE_CONTAINER_NAME;
    const imagePromises = project.images.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });

    await Promise.all(imagePromises);

    await Project.findByIdAndDelete(id);
    // send success message
    res.json({ message: "Project deleted successfully" });
};

const deleteProjectImage = async (req, res) => {
    // get project id and image id from request params
    const { projectId } = req.params;

    // get image name from request body
    const { imageNames } = req.body;

    // check if project id is valid
    if (!mongoose.isValidObjectId(projectId)) {
        throw new BadRequestError("Invalid project id");
    }

    // get project by id
    const project = await Project.findById(projectId);

    // if project not found throw error
    if (!project) {
        throw new NotFoundError("Project not found");
    }

    const imagePromises = imageNames.map(async (imageName) => {
        // check if image exists in project images
        if (!project.images.includes(imageName)) {
            throw new NotFoundError("Image not found in project images");
        }
        try {
            // Delete image from azure blob storage
            const containerName = process.env.SABMAF_IMAGE_CONTAINER_NAME;
            const containerClient =
                blobServiceClient.getContainerClient(containerName);
            const blockBlobClient =
                containerClient.getBlockBlobClient(imageName);

            await blockBlobClient.deleteIfExists();
            const images = project.images.filter(
                (image) => image !== imageName
            );
            project.images = images;
            // return imageName;
        } catch (error) {
            console.log(error.details);
            // if (error.details.code === "BlobNotFound") {
            //     throw new NotFoundError("Image not found");
            // }
            throw new BadRequestError("Error deleting image");
        }
    });

    await Promise.all(imagePromises);
    console.log(project.images);
    await project.save();

    // send success message
    res.json({ message: "Image deleted successfully" });
};

const addProjectImage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }
    // get project id and image id from request params
    const { projectId, imageName } = req.params;

    // check if project id is valid
    if (!mongoose.isValidObjectId(projectId)) {
        throw new BadRequestError("Invalid project id");
    }

    // get project by id
    const project = await Project.findById(projectId);

    // if project not found throw error
    if (!project) {
        throw new NotFoundError("Project not found");
    }

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.SABMAF_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    project.images = [...project.images, ...images];

    // save project
    await project.save();

    // send success message
    res.json({ message: "Image added successfully", images });
};

const updateProject = async (req, res) => {
    // get project id from request params
    const { id } = req.params;

    if (req.body.images) {
        throw new BadRequestError("Images cannot be updated from this route");
    }

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid project id");
    }

    // find project by id and delete
    const project = await Project.findById(id);

    // if project not found throw error
    if (!project) {
        throw new NotFoundError("Project not found");
    }

    if (req.body.name) {
        const nameExist = await Project.findOne({
            name: req.body.name,
        });

        if (nameExist?._id?.toString() !== id && nameExist) {
            throw new BadRequestError("Name already exists");
        }
    }

    const newProjectInfo = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        message: "Project updated successfully",
        project: newProjectInfo,
    });
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    deleteProjectImage,
    addProjectImage,
};
