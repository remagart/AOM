import React, { Component } from 'react'
import { Text, View,StyleSheet,FlatList,Image,Dimensions } from 'react-native';
import {ProjectColor,ProjectStyle} from "../../style/index";
import NavigationHelper from "../../Utils/NavigationHelper";
import ActionBtn from "../../component/FlashCard/ActionBtn";

const COLUMN_TYPE = {
    effect:{
        title: "效果名稱: ",
        column_type: "effect",
    },
    reference: {
        title: "參考資訊: ",
        column_type: "reference",
    },
    youtubeLink: {
        title: "Youtube連結: ",
        column_type: "youtubeLink",
    },
}

export default class AllFlashCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            titleTxt: 0,
        }
    }

    renderSeperate = () => {
        return (
            <View style={[ProjectColor.separator,{height:1,width: "100%"}]}/>
        )
    }

    renderText = (obj,content) => {
        let title = obj.title;
        let lineNum = (obj.column_type == COLUMN_TYPE.effect.column_type)? 3:0;
        return (
            <View style={{flexDirection: "row",}}>
                <View onLayout={(e)=>{
                    if(this.state.titleTxt == 0){
                        this.setState({
                            titleTxt: e.nativeEvent.layout.width,
                        });
                    }
                }}>
                    <Text style={[ProjectStyle.textCaption,ProjectColor.textNormal]}>{title}</Text>
                </View>
                <View style = {{width: NavigationHelper.SCREEN_WIDTH - 32 - 60 - 8 - this.state.titleTxt}}>
                    <Text style={[ProjectStyle.textCaption,ProjectColor.textNormal]} numberOfLines={lineNum}>{content}</Text>
                </View>
            </View>
        )
    }

    renderItem = () => {
        let t = "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容";
        return (
            <View style={{flexDirection: "row",paddingVertical: 8,paddingHorizontal: 16,backgroundColor:"#FFF"}}>
                <View>
                    <Image source={{uri: "https://img.ltn.com.tw/Upload/news/600/2018/12/11/phpGFBDNm.jpg"}} style={{width: 60,height:60,}}/>
                </View>
                <View style={{padding:4,}}>
                    {this.renderText(COLUMN_TYPE.effect,t)}
                    {this.renderText(COLUMN_TYPE.reference,"內容")}
                    {this.renderText(COLUMN_TYPE.youtubeLink,"內容")}
                </View>
            </View>
        )
    }

    renderList = () => {
        let data = new Array(10).fill(1);
        return (
            <View style={{flex: 1}}>
                <FlatList 
                    data = {data}
                    extraData = {this.state}
                    keyExtractor = {(item,index)=> "renderList" + index}
                    renderItem = {({item})=>{
                        return (
                            <View style={{flex: 1}}>
                                {this.renderItem(item)}
                                {this.renderSeperate()}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderList()}

                {/* need to put on the bottom of render() */}
                <ActionBtn />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...ProjectColor.background,
        flex: 1,
    }
})
