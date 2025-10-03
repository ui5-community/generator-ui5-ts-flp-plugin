import { Button$PressEvent } from "sap/m/Button";
import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Container from "sap/ushell/Container";
import Extension from "sap/ushell/services/Extension";

/**
 * @namespace <%=appId%>
 */
export default class Component extends UIComponent {
  static metadata = {
    manifest: "json"
  };

  /**
   * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
   * @public
   * @override
   */
  public init(): void {
    // call the base component's init function
    super.init();
    void this.handleInit();
  }

  private async handleInit() {
    // load translations from messagebundle
    const resourceModel = new ResourceModel({
      bundleName: "de.kernich.fiori.fullscreen.messagebundle",
      async: true
    });
    const resourceBundle = await resourceModel.getResourceBundle();

    // fetch Extension service
    const extension = await Container.getServiceAsync<Extension>("Extension");

    // register button
    const item = await extension.createHeaderItem({
      icon: document.fullscreenElement
        ? "sap-icon://exit-full-screen"
        : "sap-icon://full-screen",
      text: document.fullscreenElement
        ? resourceBundle.getText("btnExitFullscreen")
        : resourceBundle.getText("btnEnterFullscreen"),
      press: (event: Button$PressEvent) => {
        if (!document.fullscreenElement) {
          void document.body.requestFullscreen();
          event
            .getSource()
            .setText(resourceBundle.getText("btnExitFullscreen"));
          event.getSource().setIcon("sap-icon://exit-full-screen");
        } else {
          void document.exitFullscreen();
          event
            .getSource()
            .setText(resourceBundle.getText("btnEnterFullscreen"));
          event.getSource().setIcon("sap-icon://full-screen");
        }
      }
    });

    // show button in all apps
    item.showForAllApps();
  }
}
