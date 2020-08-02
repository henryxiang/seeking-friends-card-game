const path = require("path");
const { spawn } = require("child_process");

const workingDir = path.join(__dirname, "..", "server");
process.chdir(workingDir);

const npm = spawn("npm", ["run", "dev"], { stdio: "inherit" });

npm.on("data", (data) => console.log(data));
npm.on("error", (error) => console.error(error));
