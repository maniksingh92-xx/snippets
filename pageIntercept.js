//
var serverContextObserver =
{
  observe: function(subject, topic, data)
  {
    if (topic == "http-on-modify-request") {

      //Fetch url from browser request before loading
      CURRENT_URL = subject.URI.spec;

      //Example RegExp for a Privly Server *Needs to be replaced by a function which can
      //fetch trusted servers from the user profile and iterate over their RegExp
      var TRUSTED_SERVER = /https:\/\/privlyalpha\.org\/app/;

      //Example redirection to the extension context
      if (CURRENT_URL.match(TRUSTED_SERVER) )
        {
          gBrowser.loadURI("chrome://privly/content/privly-applications/PlainPost/show.html?privlyOriginalURL=https%3A%2F%2Fpriv.ly%2Fposts%2F2%3FprivlyApp%3DPlainPost%23privlyInject1");
      }
    }
  },

  get observerService() {
    return Components.classes["@mozilla.org/observer-service;1"]
                     .getService(Components.interfaces.nsIObserverService);
  },

  register: function()
  {
    this.observerService.addObserver(this, "http-on-modify-request", false);
  },

  unregister: function()
  {
    this.observerService.removeObserver(this, "http-on-modify-request");
  }
};

serverContextObserver.register();