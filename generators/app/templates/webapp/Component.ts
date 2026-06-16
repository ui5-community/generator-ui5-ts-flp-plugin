import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Container from "sap/ushell/Container";
import MessageToast from "sap/m/MessageToast";<% if (gte1_120_0) { %>
import Extension from "sap/ushell/services/Extension";
import { Button$PressEvent } from "sap/m/Button";<% } else { %>
import Renderer from "sap/ushell/renderers/fiori2/Renderer";
import ObjectPath from "sap/base/util/ObjectPath";<% } %>

/**
 * @namespace <%= pluginId %>
 */
export default class Component extends UIComponent {
  public static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"]
  };

  <% if (gte1_120_0) { %>

  public async init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();

    // fetch Extension service
    const extension = await Container.getServiceAsync<Extension>("Extension");

    // register button
    const item = await extension.createHeaderItem({
      icon: "sap-icon://hello-world",
      text: resourceBundle.getText("btnText"),
      press: (event: Button$PressEvent) => {
        MessageToast.show("Hello World");
      }
    });

    item.showForAllApps();
    item.showOnHome();
  }

  <% } else { %>

  public async init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();

    const renderer = await this.getRenderer();

    renderer.addHeaderEndItem("sap.m.Button", {
      icon: "sap-icon://hello-world",
      tooltip: resourceBundle.getText("btnText"),
      press: () => {
        MessageToast.show("Hello World");
      }
    }, true, true, []);
  }

  private async getRenderer(): Promise<Renderer> {
    const oShellContainer = ObjectPath.get("sap.ushell.Container");
    if (!oShellContainer) {
      throw new Error("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
    }
    const oRenderer = oShellContainer.getRenderer();
    if (oRenderer) {
      return oRenderer;
    } else {
      throw new Error("Illegal state: shell renderer not available after receiving 'rendererLoaded' event.");
    }
  }

  <% } %>
}
