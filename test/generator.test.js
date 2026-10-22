import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { describe, it } from "node:test";
import url from "node:url";

import helpers from "yeoman-test";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const generatorPath = path.join(__dirname, "../generators/app/index.js");
const require = createRequire(import.meta.url);

describe("SAP Application Wizard (Yeoman UI) compatibility", () => {
  it("require() returns the generator class instead of the module namespace", () => {
    const Generator = require(generatorPath);
    assert.equal(typeof Generator, "function");
    // yeoman-environment v3 (used first by Yeoman UI) assigns its meta data to the loaded module
    assert.doesNotThrow(() =>
      Object.assign(Generator, {
        resolved: generatorPath,
        namespace: "ts-flp-plugin:app",
        packagePath: path.dirname(generatorPath)
      })
    );
  });

  it("import() returns the generator class as default export", async () => {
    const { default: Generator } = await import(
      url.pathToFileURL(generatorPath)
    );
    assert.equal(typeof Generator, "function");
    assert.equal(
      Generator.displayName,
      "Create a new Fiori plugin with TypeScript"
    );
  });
});

describe("generator", () => {
  for (const [pluginType, frameworkVersion, tstypes] of [
    ["headerButton", "1.153.0", "@sapui5/types"],
    ["userMenuAction", "1.153.0", "@sapui5/types"],
    ["backgroundService", "1.153.0", "@sapui5/types"],
    ["headerButton", "1.108.0", "@sapui5/ts-types-esm"]
  ]) {
    it(`creates a ${pluginType} plugin for UI5 ${frameworkVersion}`, async () => {
      const result = await helpers
        .run(generatorPath)
        .withOptions({ skipInstall: true })
        .withAnswers({
          namespace: "com.myorg.myplugin",
          pluginType,
          frameworkVersion,
          author: "Jane Doe",
          newdir: false,
          initrepo: false
        });

      for (const file of [
        "package.json",
        "ui5.yaml",
        "ui5-test.yaml",
        "tsconfig.json",
        "eslint.config.mjs",
        ".gitignore",
        "webapp/Component.ts",
        "webapp/manifest.json",
        "webapp/test/flpSandbox.html",
        "webapp/test/flpSandbox.config.js",
        "webapp/test/flpSandbox.ts"
      ]) {
        assert.ok(
          fs.existsSync(path.join(result.cwd, file)),
          `${file} is missing`
        );
      }

      const pkg = JSON.parse(
        fs.readFileSync(path.join(result.cwd, "package.json"), "utf8")
      );
      assert.equal(pkg.name, "com.myorg.myplugin");
      assert.equal(pkg.author, "Jane Doe");
      assert.equal(pkg.devDependencies[tstypes], frameworkVersion);

      // bootstrap parameters of the FLP sandbox: dash-case as of UI5 1.120, camelCase before
      const sandbox = fs.readFileSync(
        path.join(result.cwd, "webapp/test/flpSandbox.html"),
        "utf8"
      );
      const newSpelling = tstypes === "@sapui5/types";
      assert.equal(sandbox.includes("data-sap-ui-resource-roots"), newSpelling);
      assert.equal(sandbox.includes("data-sap-ui-resourceroots"), !newSpelling);
      assert.match(sandbox, /module:com\/myorg\/myplugin\/test\/flpSandbox"/);
      assert.doesNotMatch(sandbox, /<script>/);

      const ui5Yaml = fs.readFileSync(
        path.join(result.cwd, "ui5.yaml"),
        "utf8"
      );
      assert.match(
        ui5Yaml,
        new RegExp(`version: "${frameworkVersion.replace(/\./g, "\.")}"`)
      );
    });
  }
});
