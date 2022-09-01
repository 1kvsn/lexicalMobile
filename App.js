import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import WebView from 'react-native-webview';

// const uri = [
//   'https://573ktm.csb.app/',
//   'https://573ktm.csb.app/',
//   'https://573ktm.csb.app/',
//   'https://573ktm.csb.app/',
// ];

// NOTE: This doesn't work. I think we can't pass dispatchEvent method inside a script and send inside web-view to execute there.
function getInjectableJSMessage(message) {
  return `
    (function() {
      document.dispatchEvent(new MessageEvent('message', {
        data: ${JSON.stringify(message)}
      }));
    })();
  `;
}

// Note: I wanted to emulate the feed and pass each JSON inside a web-view instance.
// I wanted to dynamically pass the JSON from RN to Web-View
const WebViewContainer = ({json}) => {
  const webviewRef = React.useRef();

  const [receivedData, setReceivedData] = React.useState([]);

  // We can run this kind of code using 'injectedJavaScript' prop
  // It'll only run once.
  const runFirst = `
      document.body.style.backgroundColor = 'green';
      setTimeout(function() { 
        document.body.style.borderColor = 'purple';
        document.body.style.borderWidth = '20px';
        window.alert('The background has been changed to green and then purple by injected JS')
       }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const runAtMyConvenience = `
    document.body.style.backgroundColor = 'blue';
    true;
  `;

  /**
   * TODO: How to dynamically take JSON from Array of Posts and pass it into web-view ? NOTE: I can't figure out how to listen to this data in Web App.
   * Only when I know I've received the data, I can take certain actions inside the web-view component for Lexical Editor.
   * **/
  const callThisFromEditorInsideWebView = `
    window.ReactNativeWebView.postMessage('{"name":"thanos","place":["moon"]}')
    true;
  `;

  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#the-injectjavascript-method
  React.useEffect(() => {
    // NOTE: setTimeout was not added for any reason. We can remove this and the code inside will still work
    setTimeout(() => {
      // NOTE: This works fine. We call this method at our convenience and pass the JS. This might be of our use.
      // webviewRef.current.injectJavaScript(runAtMyConvenience);

      webviewRef.current.injectJavaScript(callThisFromEditorInsideWebView);

      // Note: This commented code doesn't work

      // webviewRef.current.injectJavaScript(
      //   getInjectableJSMessage({
      //     name: 'Sasikant',
      //     place: 'mooon',
      //   }),
      // );
    }, 3000);
  }, [callThisFromEditorInsideWebView]);

  return (
    <WebView
      ref={ref => (webviewRef.current = ref)}
      source={{uri: 'http://localhost:3001/'}}
      onMessage={e => {
        // Note: This works fine.
        console.log(e.nativeEvent, '--- data  from Editor');
      }}
      style={{flex: 1}}
      onLoadEnd={() => {
        // NOTE: This works fine. However, we need to know when to fire a script which we pass this way.
        // onLoadEnd might not be the best event on which we can run this kind of script. Not sure.
        webviewRef.current.injectJavaScript(callThisFromEditorInsideWebView);
      }}

      // Note: This works. This runs ONCE only. Might not be of our use.
      // injectedJavaScript={runFirst}
    />
  );
};

const App = () => {
  // NOTE: I wanted to emulate the api response and render list of web-views and pass individual JSON inside each web-view component.
  // I wanted to dynamically pass the JSON from RN to Web-View and render each web-view component with its own JSON.
  // The raw JSON dummy json list is stored in a variable at the bottom of this file.
  // Remember, it is a list of RAW JSON. It is not stringified.
  return (
    <SafeAreaView style={styles.container}>
      {DUMMY_FEED.map((json, index) => {
        return (
          <WebViewContainer
            key={Math.floor(Math.random() * 3000)}
            json={json}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    marginTop: 30,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 50,
  },
});

export default App;

// each object represents a post JSON content
const DUMMY_FEED = [
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is first post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is second post of this feed',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is third post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 4th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 5th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 6th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 7th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 8th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 9th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is 10th post of this feed.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
];

const RAW_DUMMY_JSON_TO_SEND_TO_WEB_VIEW = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'This is Sasikant. I’m a JS Developer at Torum.',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

const DUMMY_STRINGIFIED = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is Sasikant. I’m a JS Developer at Torum.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
