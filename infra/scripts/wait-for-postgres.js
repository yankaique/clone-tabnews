const { exec } = require("node:child_process");

let ballInterval;
let ballIndex = 0;
const balls = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function waitForPostgres() {
  ballInterval = setInterval(() => {
    const frame = balls[ballIndex++ % balls.length];
    process.stdout.write(
      `\r\x1b[33m${frame} Aguardando Postgres aceitar conexões...\x1b[0m `,
    );
  }, 100);
}

function stopLoading() {
  clearInterval(ballInterval);
  process.stdout.write(
    `\r\x1b[32m✔ Postgres está pronto e aceitando conexões!\x1b[0m\n`,
  );
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      setTimeout(checkPostgres, 500);
      return;
    }

    stopLoading();
  }
}

waitForPostgres();
checkPostgres();
