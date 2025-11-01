import database from "infra/database";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST'
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json()
  expect(Array.isArray(responseBody)).toBe(true)
  // validar se a tabela existe dentro do bd
  // expect(responseBody.length).toBeGreaterThan(0);
});