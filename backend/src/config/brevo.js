import * as Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const client = Brevo.ApiClient.instance;

// API key
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// Transactional email API
const transactionalEmailApi = new Brevo.TransactionalEmailsApi();

export default transactionalEmailApi;