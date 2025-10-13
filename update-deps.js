const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const PACKAGES = [
  "ph-typescript-lib-aws",
  "ph-typescript-lib-backend",
  "ph-typescript-lib-cba",
  "ph-typescript-lib-iaac",
  "ph-typescript-lib-nestjs",
  "ph-typescript-lib-scraping",
  "ph-typescript-lib-tcp-ws",
  "ph-typescript-lib-uniswap",
];

const SKIP = new Set([]);

function run(command, options = {}) {
  try {
    return execSync(command, { stdio: "pipe", ...options }).toString();
  } catch (error) {
    const stdOut = error && error.stdout ? error.stdout.toString() : "";
    const stdErr = error && error.stderr ? error.stderr.toString() : "";
    if (stdOut.trim()) return stdOut;
    console.error(`Error running command: ${command}`);
    if (stdErr.trim()) console.error(stdErr.trim());
    return "";
  }
}

function getPackageJson(dir) {
  const packageJsonPath = path.join(dir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`No package.json found in ${dir}`);
  }
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
}

function getOutdatedDeps(dir) {
  const raw = run("npm outdated --json", { cwd: dir });
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to parse "npm outdated" JSON in ${dir}`);
    return {};
  }
}

function installDep(dir, depName, version, pkgJson) {
  const isDev = !!(
    pkgJson.devDependencies &&
    Object.prototype.hasOwnProperty.call(pkgJson.devDependencies, depName)
  );

  const flag = isDev ? "-D" : "";
  const prettyName = path.basename(dir);
  const installSpec = `${depName}@${version}`;

  const isDry = (argv?.[2] ?? "") === "--dry-run";

  console.log(
    `${isDry ? "Would be updating" : "Updating"}${
      isDev ? " dev" : ""
    } dependency '${depName}' to '${version}' in package '${prettyName}'`
  );

  if (!isDry) {
    run(`npm install ${flag} ${installSpec}`, { cwd: dir });
  }
}

function updateOnePackage(dir) {
  if (!fs.existsSync(dir) || !fs.existsSync(path.join(dir, "package.json"))) {
    console.warn(`Skipping '${dir}' (not found or no package.json).`);
    return;
  }

  const pkgJson = getPackageJson(dir);
  const outdated = getOutdatedDeps(dir);
  const entries = Object.entries(outdated);
  if (entries.length === 0) {
    console.log(`No updates needed in '${path.basename(dir)}'.`);
    return;
  }

  for (const [name, info] of entries) {
    if (SKIP.has(name)) {
      console.log(`Skipping dependency '${name}' in '${path.basename(dir)}'`);
      continue;
    }
    const targetVersion = (info.latest || "").replace(/^\^/, "");
    if (!targetVersion) {
      console.log(
        `No target version resolved for '${name}' in '${path.basename(
          dir
        )}'; skipping.`
      );
      continue;
    }
    installDep(dir, name, targetVersion, pkgJson);
  }
}

function main() {
  console.log("argv", argv);
  run("npm cache clean --force");
  const root = process.cwd();
  for (const pkgRelPath of PACKAGES) {
    const dir = path.resolve(root, pkgRelPath);
    console.log(
      `\n==============================| Checking '${pkgRelPath}' |==============================`
    );
    updateOnePackage(dir);
    console.log(
      "=============================================================================================="
    );
  }
}

main();
