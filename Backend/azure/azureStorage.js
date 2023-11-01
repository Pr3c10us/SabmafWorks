const { BlobServiceClient } = require("@azure/storage-blob");
const {
    DefaultAzureCredential,
    ClientSecretCredential,
} = require("@azure/identity");
const { StorageManagementClient } = require("@azure/arm-storage");

require("dotenv").config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

// Azure authentication in environment variables for DefaultAzureCredential
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const secret = process.env.AZURE_CLIENT_SECRET;
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

const credentials = new ClientSecretCredential(tenantId, clientId, secret);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credentials,
    subscriptionId
);

module.exports = blobServiceClient;
