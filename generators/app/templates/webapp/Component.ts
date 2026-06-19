import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Container from "sap/ushell/Container";
import MessageToast from "sap/m/MessageToast";<% if (gte1_120_0) { %>
import Extension from "sap/ushell/services/Extension";<% if (isHeaderButton || isUserMenuAction) { %>
import { Button$PressEvent } from "sap/m/Button";<% } %><% } else { %>
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

  <% if (isHeaderButton) { %>
  // ============================================================
  // Plugin type: Launchpad Header Button
  // ============================================================
  <% if (gte1_120_0) { %>

  public async init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();

    // fetch Extension service
    const extension = await Container.getServiceAsync<Extension>("Extension");

    // register header button
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
  <% } else if (isUserMenuAction) { %>
  // ============================================================
  // Plugin type: User Menu Action
  // ============================================================
  <% if (gte1_120_0) { %>

  public async init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();

    // fetch Extension service
    const extension = await Container.getServiceAsync<Extension>("Extension");

    // register a new entry in the user actions menu
    const item = await extension.createUserAction({
      icon: "sap-icon://hello-world",
      text: resourceBundle.getText("btnText"),
      press: (event: Button$PressEvent) => {
        MessageToast.show("User menu action triggered");
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

    // add an item to the user action menu
    renderer.addUserAction({
      controlType: "sap.m.Button",
      oControlProperties: {
        icon: "sap-icon://hello-world",
        text: resourceBundle.getText("btnText"),
        press: () => {
          MessageToast.show("User menu action triggered");
        }
      },
      bIsVisible: true,
      bCurrentState: true
    });
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
  <% } else if (isBackgroundService) { %>
  // ============================================================
  // Plugin type: Background Service
  // ============================================================
  <% if (gte1_120_0) { %>

  public async init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();

    // make sure the shell container is initialized before starting any work
    await Container.getServiceAsync<Extension>("Extension");

    // background services usually don't render UI; perform the work here
    this.startBackgroundWork(resourceBundle.getText("btnText"));
  }

  private startBackgroundWork(label: string): void {
    // TODO: implement the actual background work
    MessageToast.show(`Background service "${label}" started`);
  }

  <% } else { %>

  public init() {
    super.init();

    // load translations from i18n model
    const resourceModel = this.getModel("i18n") as ResourceModel;
    resourceModel.getResourceBundle().then((resourceBundle) => {
      // make sure the shell container exists before starting any work
      const oShellContainer = ObjectPath.get("sap.ushell.Container");
      if (!oShellContainer) {
        throw new Error("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
      }

      // background services usually don't render UI; perform the work here
      this.startBackgroundWork(resourceBundle.getText("btnText"));
    });
  }

  private startBackgroundWork(label: string): void {
    // TODO: implement the actual background work
    MessageToast.show(`Background service "${label}" started`);
  }

  <% } %>
  <% } %>
}
