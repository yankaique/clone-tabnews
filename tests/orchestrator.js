import retry from "async-retry";
import database from "infra/database";

const webserverUrl = "http://localhost:3000";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 5000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${webserverUrl}/api/v1/status`);
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

const orchestrator = {
  waitForAllServices,
  cleanDatabase,
};

export default orchestrator;
