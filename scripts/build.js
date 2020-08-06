const path = require("path");
const fs = require("fs-extra");
const { spawn } = require("child_process");

const serverDir = path.join(__dirname, "..", "server");
const clientDir = path.join(__dirname, "..", "client");
process.chdir(clientDir);

// Build client
let cmd = spawn("npm", ["run", "build"], { stdio: "inherit" });
cmd.on("data", (data) => console.log(data));
cmd.on("error", (error) => console.error(error));

// Copy built artifacts to server's public directory
const artifactDir = path.join(clientDir, "build");
const publicDir = path.join(serverDir, "public");
const backupDir = path.join(serverDir, "public.bak");
fs.moveSync(publicDir, backupDir);
fs.copySync(artifactDir, publicDir);
