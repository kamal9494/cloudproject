import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Interactions, Analytics } from 'aws-amplify';
// import awsconfig from './src/aws-exports';
import { GiftedChat , InputToolbar, Composer, ChatHeaderBar, Bubble, Send , Icon, MessageImage, Lightbox } from 'react-native-gifted-chat';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';

// Amplify.configure(awsconfig);

import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: '[Enter Identity Pool ID here]',
    region: '[Enter Region here]'
  },
  Interactions: {
    bots: {
      [Enter Bot Name here]: {
        name: '[Enter Bot Name here]',
        alias: '$LATEST',
        region: '[Enter Region here]'
      }
    }
  }
});

const botName = '[Enter Bot Name here]';
const botUser = {
  _id: 2,
  name: 'Bot',
  avatar: 'https://repository-images.githubusercontent.com/259820727/4edc2c80-9871-11ea-811d-342b0d0395f6',
};
let chatId = 1;

const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        marginBottom: 1,
        padding: 5,  
        borderRadius: 20
      }}
      placeholder = "Type something..."
    />
  );
};



export default class App extends React.Component {
  state = {
    messages: [
      {
        _id: chatId,
        text: 'Hey, How can I help you?',
        user: botUser,
        createdAt: new Date(),
        image : '',
      },
    ],
  };

  sendMessageToBot = async (userInput) => {
    const response = await Interactions.send(botName, userInput);
    console.log(response);
    this.appendChatMessages([this.formatMessage(response)]);
  };

  formatMessage = (res) => {
    chatId = chatId + 1;
    if(res.responseCard != null){
      let pics = 0;
      while(pics != 2){
        return {
          _id: chatId,
          createdAt: new Date(),
          text: res.message,
          user: botUser,
          image : res.responseCard.genericAttachments[pics].imageUrl,
        };
        pics++;
      }
    }else{
      return {
        _id: chatId,
        createdAt: new Date(),
        text: res.message,
        user: botUser,
        image : '',
      };
    }
    
  };

  onSend = (messages) => {
    // console.log(messages);
    messages.map((msg) => this.sendMessageToBot(msg.text));
    this.appendChatMessages(messages);
  };

  appendChatMessages = (messages) => {
    // console.log(messages);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };


  
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" hidden = {false} backgroundColor = "#F5F5F5" translucent = {true}/>
        <Header/>
        <GiftedChat
        renderInputToolbar={props => customtInputToolbar(props)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble = {(props) => {
          return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor : "blue",
              marginBottom: 5,
              padding : 3,
            },
            left: {
              backgroundColor : "#EAEAEA",
              padding : 3,
              marginBottom: 5,
            }
          }}
          />
        }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageInput: { borderRadius: 30, borderTopColor: '#222', backgroundColor: 'transparent', },
  inputToolbar: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 25
  },
});
