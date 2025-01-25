#!/usr/bin/env node
const which = require("which-pm-runs");
const semver = require("semver");

const argv = process.argv.slice(2);

if (argv.length === 0) {
  console.error(
    "Please specify the package manager: only-allow3 <npm|pnpm|yarn|bun|deno>",
  );
  process.exit(1);
}

let [pm, version] = argv[0].split("@");
if (["npm", "yarn", "pnpm", "bun", "deno"].indexOf(pm) === -1) {
  console.error(
    `"${pm}" is not a valid package manager. Valid package managers are: npm, pnpm, yarn, bun, or deno.`,
  );
  process.exit(1);
}

const current = which();

function notes(pm, cmd, link) {
  console.warn("-".repeat(process.stdout.columns));
  console.warn(
    `This project requires to use "${cmd}" as the package manager.

Please use \`${pm}${cmd ? " " + cmd : ""}\` to install this project.
If you didn't have ${pm}, please learn more at ${link}.`,
  );
  console.warn("-".repeat(process.stdout.columns));
}

if (current.name !== pm) {
  switch (pm) {
    case "npm":
      notes("npm", "install", "https://docs.npmjs.com/cli/");
      break;
    case "pnpm":
      notes("pnpm", "install", "https://pnpm.io/");
      break;
    case "yarn":
      notes("yarn", "", "https://yarnpkg.com/");
      break;
    case "bun":
      notes("bun", "install", "https://bun.sh/");
      break;
    case "deno":
      notes("deno", "install", "https://deno.com/");
      break;
  }
  process.exit(1);
}
if (!version) process.exit(0);
if (semver.valid(version)) {
  version = "^" + semver.coerce(version);
} else if (!semver.validRange(version)) {
  console.error(`Invalid version range: ${version}`);
  process.exit(1);
}

if (semver.satisfies(current.version, version)) process.exit(0);

console.error("-".repeat(process.stdout.columns));
console.error(
  `The version of ${pm}(${current.version}) doesn't satisfies the requirements (${pm}@${version}). 
Please update to at least ${semver.coerce(semver.minVersion(version))} (${semver.coerce(semver.validRange(version))
  }).`,
);
console.error("-".repeat(process.stdout.columns));
