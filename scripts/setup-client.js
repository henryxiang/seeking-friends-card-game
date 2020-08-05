const path = require("path");
const { spawn } = require("child_process");

const workingDir = path.join(__dirname, "..", "client");
process.chdir(workingDir);

const npm = spawn("npm", ["install"], { stdio: "inherit" });

npm.on("data", (data) => console.log(data));
npm.on("error", (error) => console.error(error));
