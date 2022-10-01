import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

import WebView from 'react-native-webview';
import NativeToWeb from './NativeToWeb';
import WebToNative from './WebToNative';

const WebViewContainer = ({json}) => {
  const webviewRef = React.useRef();


  const _onMessage = event => {
    const dataFromWebView = JSON.parse(event.nativeEvent.data);
    console.log('_onMessage => dataFromWebView', dataFromWebView);
  };

  const onClick = () => {
  };


  return (
    <React.Fragment>
      <Button onPress={onClick} title={'RN to WebView'} />
      <WebView
        ref={ref => (webviewRef.current = ref)}
        source={{uri: 'http://localhost:3001/'}}
        onMessage={_onMessage}
        style={{flex: 1}}
        javaScriptEnabled={true}

        // Note: This works. This runs ONCE only. Might not be of our use.
        // injectedJavaScript={runFirst}
      />
    </React.Fragment>

  );
};

const App = () => {
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

      {/*<NativeToWeb />*/}
      {/*<WebToNative />*/}
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

const stringifiedJSON = JSON.stringify({
  type: 'setJSON',
  data: {
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
});

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
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is third post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 4th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 5th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 6th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 7th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 8th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 9th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
  // {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: 'This is 10th post of this feed.',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // },
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

const DUMMY_STRINGIFIED =
  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is Sasikant. I’m a JS Developer at Torum.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
