import * as Brevo from "@getbrevo/brevo";

const transactionalEmailApi = new Brevo.TransactionalEmailsApi();


transactionalEmailApi.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default transactionalEmailApi;