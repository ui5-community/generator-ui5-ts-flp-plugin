import Container from "sap/ushell/Container";
import type Control from "sap/ui/core/Control";

/**
 * Renders the shell of the FLP sandbox, the plugin is loaded as bootstrap plugin (see flpSandbox.config.js).
 */
<% if (gte1_120_0) { %>// createRenderer is deprecated as of UI5 1.120 without successor, but still required for the local FLP sandbox
// ui5lint-disable-next-line no-deprecated-api
<% } %>void (Container.createRenderer("fiori2", true) as Promise<Control>).then((renderer) => {
  renderer.placeAt("content");
});
