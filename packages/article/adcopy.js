import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, WebView, Dimensions, Linking, StyleSheet } from "react-native";
import { getSlotConfig } from "../ad/generate-config";
import { pbjs as pbjsConfig } from "../ad/config";

import Placeholder from "../ad/placeholder";
import TimeManager from "./time-manager";

class AdCopy extends Component {
  static hasDifferentOrigin(url, baseUrl) {
    return url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;
  }

  static hasAdReady(message) {
    return message ? message.indexOf("AD_READY") > -1 : false;
  }

  static onOriginChange(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  constructor(props) {
    super(props);
    const { width } = Dimensions.get("window");
    this.config = getSlotConfig(props.section, props.code, width);
    this.viewBorder = 10;

    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
    this.setAdReady = this.setAdReady.bind(this);

    this.state = {
      adReady: false,
      initDate: new Date()
    };
  }

  setAdReady() {
    this.setState({
      adReady: true
    });
  }

  handleOriginChange(url) {
    if (AdCopy.hasDifferentOrigin(url, this.props.baseUrl)) {
      this.webview.stopLoading();
      AdCopy.onOriginChange(url);
    }
  }

  handleNavigationChange(navState) {
    // NOTE: we're using title here to send messages between the webview and the Ad component
    if (AdCopy.hasAdReady(navState.title)) {
      TimeManager.addTime(this.state.initDate, new Date());
      this.setAdReady();
    }

    this.handleOriginChange(navState.url);
  }

  render() {
    const html = `
      <html>
        <head>
          <style>
            body {
              margin: 0 auto;
              display: table;
              height: 100%;
              width: 100%;
              text-align: center;
            }
            div#${this.props.code} {
              display: table-cell;
              vertical-align: middle;
            }
          </style>
          <script async src="https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js"></script>
          <script async src="https://www.googletagservices.com/tag/js/gpt.js"></script>
        </head>
        <body>
          <div id='${this.config.code}'>
          </div>

          <script>
            var i = 0;
            const config = ${JSON.stringify(this.config)};
            var PREBID_TIMEOUT = ${pbjsConfig.timeout};
            var adUnits = [{
                code: config.code,
                sizes: config.sizes,
                bids: config.bids
            }];

            function notifyAdReady() {
              document.title = 'AD_READY';
              window.location.hash = ++i;
            }

            function initPrebidDefaults() {
              window.pbjs = window.pbjs || {};
              pbjs.que = pbjs.que || [];
            }

            function addServices () {
              googletag.cmd.push(function () {
                const slotName = '/${this.props.networkId}/${this.props
      .adUnit}/${this.props.section}';
                googletag
                  .defineSlot(slotName, config.sizes, config.code)
                  .addService(googletag.pubads());

                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            }

            function sendAdserverRequest () {
              if (pbjs.adserverRequestSent) return;
              notifyAdReady();
              pbjs.adserverRequestSent = true;
              googletag.cmd.push(function() {
                pbjs.que.push(function() {
                  pbjs.setTargetingForGPTAsync();
                  googletag.display(config.code);
                  googletag.pubads().refresh();
                });
              });
            }

            function initGoogleTagDefaults () {
              window.googletag = window.googletag || {};
              googletag.cmd = googletag.cmd || [];
              googletag.cmd.push(function() {
                googletag.pubads().disableInitialLoad();
              });

              addServices();

              pbjs.que.push(function() {
                pbjs.addAdUnits(adUnits);
                pbjs.requestBids({
                  bidsBackHandler: sendAdserverRequest
                });
              });

              setTimeout(function() {
                sendAdserverRequest();
              }, PREBID_TIMEOUT);
            }

            function init () {
              initPrebidDefaults();
              initGoogleTagDefaults();
            }
            init();

          </script>
        </body>
      </html>
      `;

    return (
      <View style={this.props.style}>
        <Placeholder
          width={this.config.maxSizes.width}
          height={this.config.maxSizes.height}
          style={{
            display: this.state.adReady ? "none" : "flex"
          }}
        />
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          source={{ html, baseUrl: this.props.baseUrl }}
          style={{
            height: this.config.maxSizes.height + this.viewBorder,
            display: this.state.adReady ? "flex" : "none"
          }}
          baseUrl={this.props.baseUrl}
          onNavigationStateChange={this.handleNavigationChange}
        />
      </View>
    );
  }
}

AdCopy.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  code: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  style: React.PropTypes.instanceOf(StyleSheet)
};

AdCopy.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  baseUrl: "https://www.thetimes.co.uk/",
  style: null
};

export default AdCopy;