import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Container from "sap/ushell/Container";
import Extension from "sap/ushell/services/Extension";
import { Button$PressEvent } from "sap/m/Button";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace <%= pluginId %>
 */
export default class Component extends UIComponent {
  public static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"]
  };

  public async init() {
    super.init();

    // load translations from messagebundle
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
}
