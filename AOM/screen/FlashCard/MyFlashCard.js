import React, { Component } from 'react';
import { View, Text,StyleSheet,Animated,Easing,TouchableOpacity,Dimensions } from 'react-native';
import NavigationHelper from "../../Utils/NavigationHelper";
import {ProjectColor,ProjectStyle} from "../../style/index";
import ActionBtn from "../../component/FlashCard/ActionBtn";
import Youtube from "react-native-youtube";
import key from "../../key/googleApiKey.json";
import ToastComponent from '../../component/Common/ToastComponent';
import FetchAllCard from '../../Utils/Fetch/AllFlashCardData/FetchAllCard';
import StringHelper from '../../Utils/StringHelper';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ANDROID_ERROR = "UNAUTHORIZED_OVERLAY";

const fakeData = {
  effectTitle: "3 fly",
  reference: "這是參考",
  youtubeLink: "www.google.com",
}

export default class MyFlashCard extends Component {
  constructor(props) {
    super(props);

    this.fetchLib = new FetchAllCard();

    this.state = {
      animateValue: new Animated.Value(0),
      cardInitHeight: (NavigationHelper.SCREEN_WIDTH - 32) * 0.6,
      isTitleSide: true,

      allCardData: null,
      chooseIdx: 0,
      yt_Id: "",
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

  async componentDidMount(){
    this.isMount = true;
    let data = await this.fetchLib.fetchAllCardData();
    this.setStateDidMount({allCardData: data},()=>{
      this.onClickedStartAgain();
    });
  }

  componentWillUnmount(){
    this.isMount = false;
  }

  // 可以解決unmount，不做setState
  setStateDidMount = (state, callback = () => {}) => {
    if (this.isMount) {
        this.setState(state, callback);
    }
  }

  //產生min到max之間的亂數
  getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  };

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
    let {allCardData} = this.state;
    let chooseIdx = 0;
    let id = "";
    if(allCardData && allCardData.length > 0){
      chooseIdx = this.getRandom(0,allCardData.length - 1);
      let ytLink = allCardData[chooseIdx].youtubeLink;
      id = StringHelper.fotmatYT(ytLink);
    }
    this.setStateDidMount({chooseIdx: chooseIdx,yt_Id: id});
  }

  onError = (e) => {
    console.log("err",e);
    if(e && e.error == ANDROID_ERROR){
      requestAnimationFrame(()=>{
        ToastComponent.showToast("請使用全螢幕觀看",ToastComponent.STATUS_TOAST.DEFAULT);
      });
    }
  }

  renderVideo = () => {
    let videoW = NavigationHelper.SCREEN_WIDTH - 32 - 32;
    let videoH = (videoW * 9) / 16;
    const {yt_Id} = this.state;

    if(yt_Id && yt_Id != ""){
      return (
        <View style={{backgroundColor: "#DDFFAA",width: videoW,height:videoH}}>
          <Youtube 
            apiKey = {key.key}
            videoId = {yt_Id} // The YouTube video ID
            fullscreen = {false}
            control = {1}
            play = {true}
            style={{ alignSelf: 'stretch', width: videoW,height: videoH,}}
            onChangeState={e=>{console.log("ddd",e);}}
            onError={this.onError}
          />
        </View>
      )
    }else{
      return (
        <View style={[styles.noVideoView,{width: videoW,height:videoH}]}>
          <Text style={[ProjectStyle.textBody2,ProjectColor.whiteTxt,{fontWeight: "bold"}]}>請檢查youtube連結是否有誤</Text>
        </View>
      )
    }
  }

  renderTitleSide = () => {
    const {allCardData,chooseIdx} = this.state;
    let title = (allCardData && allCardData[chooseIdx].effectTitle) || "";

    return (
      <View style={[styles.titleSide,{height: this.state.cardInitHeight - 2}]}>
        <Text style={[ProjectStyle.textH1,ProjectColor.textWeight,{fontWeight:"bold"}]}>{title}</Text>
      </View>
    )
  }

  renderDetailSide = () => {
    const {allCardData,chooseIdx} = this.state;
    let title = (allCardData && allCardData[chooseIdx].effectTitle) || "";
    let reference =  (allCardData && allCardData[chooseIdx].reference) || "";
    
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
  },
  noVideoView: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
})

