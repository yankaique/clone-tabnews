import database from "infra/database.js";

async function status (request, response) {
  const databasePostgresVersion = await database.query("SHOW server_version;");
  const postgresVersion = databasePostgresVersion.rows[0].server_version

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = databaseMaxConnections.rows[0].max_connections
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });
  const openedConnections = databaseOpenedConnections.rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;