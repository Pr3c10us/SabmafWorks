const blobServiceClient = require("./azureStorage");

const createContainer = async () => {
    try {
        // Create a unique name for the container
        const containerName = "asisimages";

        console.log("\nCreating container...");
        console.log("\t", containerName);

        // Get a reference to a container
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        // Create the container
        const createContainerResponse = await containerClient.create();
        console.log(
            `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
        );
    } catch (error) {
        console.log(error);
    }
};
createContainer();
