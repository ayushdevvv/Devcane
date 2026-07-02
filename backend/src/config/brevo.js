import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const client = Brevo.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const transactionalEmailApi = new Brevo.TransactionalEmailsApi();

export default transactionalEmailApi;