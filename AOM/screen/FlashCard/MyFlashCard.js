import React, { Component } from 'react';
import { View, Text,StyleSheet,Animated,Easing,TouchableOpacity } from 'react-native';
import NavigationHelper from "../../Utils/NavigationHelper";
import {ProjectColor,ProjectStyle} from "../../style/index";

const fakeData = {
  effectTitle: "3 fly",
  reference: "這是參考",
  youtubeLink: "www.google.com",
}

export default class MyFlashCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animateValue: new Animated.Value(0),
      cardInitHeight: (NavigationHelper.SCREEN_WIDTH - 32) * 0.6,
      isTitleSide: true,

      allCardData: fakeData,
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
    // this.state.animateValue.setValue(0);

    this.setState({isTitleSide: !this.state.isTitleSide},()=>{
      this.rotateAnimated.start(() => {
        let h = (NavigationHelper.SCREEN_WIDTH - 32);
        if(h == this.state.cardInitHeight)  h = h * 0.6;
  
        this.setState({
          cardInitHeight: h,
        });

        this.state.animateValue.setValue(0);
      });
    })
  }

  onClickedStartAgain = () => {

  }

  renderTitleSide = () => {

    let title = this.state.allCardData.effectTitle;

    return (
      <View style={[styles.titleSide,{height: this.state.cardInitHeight - 2}]}>
        <Text style={[ProjectStyle.textH1,ProjectColor.textWeight,{fontWeight:"bold"}]}>{title}</Text>
      </View>
    )
  }

  renderDetailSide = () => {
    return (
      <View>
        <Text>背面</Text>
      </View>
    )
  }

  renderCardContent = () => {
    return (this.state.isTitleSide === true)? this.renderTitleSide() : this.renderDetailSide(); 
  }

  renderCard = () => {
    const rotateX = this.state.animateValue.interpolate({
      inputRange: [0,1],
      outputRange: ["0deg","180deg"],
    });

    return (
      <TouchableOpacity onPress={()=>{this._startAnimated()}}>
          <Animated.View
            style={[styles.cardView,{transform:[
              {rotateX:rotateX},
            ],height: this.state.cardInitHeight}]}
          >
            {this.renderCardContent()}
          </Animated.View>
      </TouchableOpacity>
    )
  }

  renderStartAgain = () => {
    return (
      <TouchableOpacity style={styles.startAgainBtn} onPress={()=>{this.onClickedStartAgain()}}>
        <View>
          <Text style={[ProjectStyle.textBody1,ProjectColor.textNormal]}>再抽一張</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.renderCard()}
        {this.renderStartAgain()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    ...ProjectColor.background,
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
  startAgainBtn:{
    backgroundColor: "rgb(200,200,200)",
    width: (NavigationHelper.SCREEN_WIDTH - 32),
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
  },
  titleSide: {
    ...ProjectColor.main,
    width: NavigationHelper.SCREEN_WIDTH - 32 - 2,
    justifyContent: "center",
    alignItems: "center",
  },
})

