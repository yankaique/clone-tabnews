import retry from "async-retry";

const webserverUrl = "http://localhost:3000";
async function  waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${webserverUrl}/api/v1/status`);
      const responseBody = await response.json();
    }
  }
}

export default {
  waitForAllServices,
}