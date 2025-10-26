import database from "infra/database.js";

async function status (request, response) {
  const dbResponse = await database.query("SELECT 1 + 1 as sum;");
  console.log(dbResponse.rows[0]);
  response.status(200).json({
    "name": "Oi Yanzito"
  });
}

export default status;