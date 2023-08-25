const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
        },
        displayAtHome: {
            type: Boolean,
            default: false,
        },
        displayImages: {
            type: String,
        },
        images: [
            {
                type: String,
            },
        ],
        services: [
            {
                type: String,
                enum: [
                    "Designs and Modelling",
                    "Construction",
                    "Interior Design",
                    "Estate Management",
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

// Demo 2: Create a project
const ProjectDemo = {
    name: "Nike Slim Shirt",
    price: 12000,
    description: "A very nice shirt",
    category: "Shirts",
    countInStock: 10,
};
