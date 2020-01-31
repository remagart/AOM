import React, { Component } from 'react';
import { View, Text,StyleSheet,Animated,Easing,TouchableOpacity,Dimensions } from 'react-native';
import NavigationHelper from "../../Utils/NavigationHelper";
import {ProjectColor,ProjectStyle} from "../../style/index";
import ActionBtn from "../../component/FlashCard/ActionBtn";

const SCREEN_HEIGHT = Dimensions.get("window").height;

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
        let h = (NavigationHelper.SCREEN_WIDTH - 32) * 0.6;

        if(this.state.isTitleSide == false){
          h = SCREEN_HEIGHT - 66 - NavigationHelper.HEADER_HEIGHT - 32 - 16;
        }
  
        this.setState({
          cardInitHeight: h,
        });

        this.state.animateValue.setValue(0);
      });
    })
  }

  onClickedStartAgain = () => {

  }

  renderVideo = () => {
    let videoW = NavigationHelper.SCREEN_WIDTH - 32 - 32;
    let videoH = (videoW * 9) / 16;

    return (
      <View style={{backgroundColor: "#DDFFAA",width: videoW,height:videoH}}>

      </View>
    )
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

    let title = this.state.allCardData.effectTitle;
    let reference =  this.state.allCardData.reference;
    
    return (
      <View style={styles.detailSide}>
        {this.renderVideo()}
        <View style={{marginTop: 16}}>
          <Text style={[ProjectStyle.textBody2,ProjectColor.textNormal]}>效果名稱: {title}</Text>
          <View style={{height: 8}}/>
          <Text style={[ProjectStyle.textBody2,ProjectColor.textNormal]}>參考資訊: {reference}</Text>
        </View>
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

        <ActionBtn />
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
    width: (NavigationHelper.SCREEN_WIDTH - 32 - 66 - 8),
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    left: 16,
  },
  titleSide: {
    ...ProjectColor.main,
    width: NavigationHelper.SCREEN_WIDTH - 32 - 2,
    justifyContent: "center",
    alignItems: "center",
  },
  detailSide:{
    flex: 1,
    backgroundColor: "#FFF",
    margin: 16,
  }
})

