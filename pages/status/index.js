import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText,
    databaseVersion,
    databaseMaxConnection,
    databaseOpenedConnections = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseVersion = data.dependencies.database.version;
    databaseMaxConnection = data.dependencies.database.max_connections;
    databaseOpenedConnections = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <p>Última atualização do banco: {updatedAtText}</p>
      <p>Versão do banco: {databaseVersion}</p>
      <p>Conexões máximas: {databaseMaxConnection}</p>
      <p>Conexão em aberto: {databaseOpenedConnections}</p>
    </div>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status da aplicação</h1>
      <UpdatedAt />
    </>
  );
}
