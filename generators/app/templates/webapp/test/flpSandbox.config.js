window["sap-ushell-config"] = {
  defaultRenderer: "fiori2",
  bootstrapPlugins: {
    RuntimeAuthoringPlugin: {
      component: "sap.ushell.plugins.rta",
      config: {
        validateAppVersion: false
      }
    },<% if (!gte1_120_0) { %>
    PersonalizePlugin: {
      component: "sap.ushell.plugins.rta-personalize",
      config: {
        validateAppVersion: false
      }
    },<% } %>
    FLPPluginAll: {
      component: "<%= pluginId %>",
      url: "../../../"
    }
  },
  renderers: {
    fiori2: {
      componentData: {
        config: {
          enableSearch: false,
          rootIntent: "Shell-home"
        }
      }
    }
  },
  services: {
    LaunchPage: {
      adapter: {
        config: {
          groups: [
            {
              tiles: []
            }
          ]
        }
      }
    },
    ClientSideTargetResolution: {
      adapter: {
        config: {
          inbounds: {}
        }
      }
    },
    NavTargetResolution: {
      config: {
        enableClientSideTargetResolution: true
      }
    }
  }
};
