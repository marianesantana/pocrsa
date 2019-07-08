/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { RSA } from 'react-native-rsa-native';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { decryptedMessage: ''}
  }

    cryptoDecrypto = async () => {
     let message = "um segredoooo ";
     let a;
     RSA.generateKeys(2048) // set key size
     .then(keys => {
       console.log('2048 private:', keys.private); // the private key
       console.log('2048 public:', keys.public); // the public key
       RSA.encrypt(message, keys.public)
       .then(encodedMessage => {
         console.log(`the encoded message is ${encodedMessage}`);
         RSA.decrypt(encodedMessage, keys.private)
         .then(decryptMessage => {
           a = decryptMessage;
           this.setState({ decryptedMessage: a })
           console.log(`The original message was ${decryptedMessage}`);
         });
       });

     }).catch( error => {
        console.log("erro : ", error)
     }
     );
   }

render(){
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button onPress={this.cryptoDecrypto} title="Criptografia"></Button>
              <Text>{this.state.decryptedMessage}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );

  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
