test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  
  const responseJson = await response.json();
  expect(responseJson.updated_at).toBeDefined();
  expect(responseJson.dependencies.database.version).toBe("16.0");
  expect(responseJson.dependencies.database.max_connections).toBe(100);
  expect(responseJson.dependencies.database.opened_connections).toBe(1);
});