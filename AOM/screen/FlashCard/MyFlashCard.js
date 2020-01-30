import React, { Component } from 'react';
import { View, Text,StyleSheet,Animated,Easing,TouchableOpacity } from 'react-native';
import NavigationHelper from "../../Utils/NavigationHelper";

export default class MyFlashCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animateValue: new Animated.Value(0),
      cardInitHeight: (NavigationHelper.SCREEN_WIDTH - 32) * 0.6,
    };

    this.rotateAnimated = Animated.timing(
      this.state.animateValue,
      {
          toValue: 1,
          duration: 500,
          easing: Easing.in,
      }
    );
  }

  _startAnimated = () => {
    this.state.animateValue.setValue(0);
    this.rotateAnimated.start(() => {

      let h = (NavigationHelper.SCREEN_WIDTH - 32);
      if(h == this.state.cardInitHeight)  h = h * 0.6;

      this.setState({
        cardInitHeight: h,
      });
    });
  }

  render() {

    const rotateX = this.state.animateValue.interpolate({
      inputRange: [0,1],
      outputRange: ["0deg","180deg"],
    });

    return (
      <View style = {styles.container}>
        <TouchableOpacity onPress={()=>{this._startAnimated()}}>
          <Animated.View
            style={[styles.cardView,{transform:[
              {rotateX:rotateX},
            ],height: this.state.cardInitHeight}]}
          >

          </Animated.View>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 16,
    alignItems: "center",
  },
  cardView: {
    width: NavigationHelper.SCREEN_WIDTH - 32,
    backgroundColor: "#FFDDAA",
    borderColor: "#000",
    borderWidth: 1,
  },
})

