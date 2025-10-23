test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("https://turbo-barnacle-wgq9r67wq4rc99g4-3000.app.github.dev/api/v1/status");
  expect(response.status).toBe(200);
});