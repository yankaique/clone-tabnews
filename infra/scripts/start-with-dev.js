import { spawn } from "child_process";

const args = process.argv.slice(2).join(" ");

const child = spawn(args, { shell: true, stdio: "inherit" });

process.on("SIGINT", async () => {
  console.log("\nEncerrando serviços Docker...");
  const stop = spawn("npm", ["run", "services:stop"], { stdio: "inherit" });

  stop.on("exit", () => {
    console.log("Serviços finalizados. Encerrando com status 0.");
    process.exit(0);
  });
});

child.on("exit", (code) => process.exit(code));
