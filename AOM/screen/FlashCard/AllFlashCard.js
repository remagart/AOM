import React, { Component } from 'react'
import { Text, View,StyleSheet,FlatList,Image,Dimensions } from 'react-native';
import {ProjectColor,ProjectStyle} from "../../style/index";
import NavigationHelper from "../../Utils/NavigationHelper";
import ActionBtn from "../../component/FlashCard/ActionBtn";
import APIManager from "../../Utils/Fetch/APIManager";

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

        this.api = new APIManager();

        this.state = {
            titleTxt: 0,
            data: [],
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async () => {
        let response = await this.api.getFlashCardData();
        let responseJSON = await response.json();

        let data = [];
        console.log("[AllFlashCard] fetchData", responseJSON);
        if(responseJSON && responseJSON.feed && responseJSON.feed.entry && responseJSON.feed.entry.length > 0){
            let dataSrc = responseJSON.feed.entry;
            data = dataSrc.map((item,index)=>{
                return {
                    effectTitle: item.gsx$effecttitle.$t,
                    reference: item.gsx$reference.$t,
                    youtubeLink: item.gsx$youtubelink.$t,
                }
            })
        }
        this.setState({data: data});
    }

    renderSeperate = () => {
        return (
            <View style={[ProjectColor.separator,{height:1,width: "100%"}]}/>
        )
    }

    renderYoutubeLinkTxt = (title,content,lineNum) => {
        return (
            <View style={{width: NavigationHelper.SCREEN_WIDTH - 32 - 60}}>
                <Text style={[ProjectStyle.textCaption,ProjectColor.textWeight]}>{title}</Text>
                <Text style={[ProjectStyle.textCaption,ProjectColor.textLight]} numberOfLines={lineNum}>{content}</Text>
            </View>
        )
    }

    renderText = (obj,content) => {
        let title = obj.title;
        let lineNum = (obj.column_type === COLUMN_TYPE.effect.column_type)? 3:0;

        if(obj.column_type === COLUMN_TYPE.youtubeLink.column_type){
            return this.renderYoutubeLinkTxt(title,content,lineNum);
        }

        return (
            <View style={{flexDirection: "row",}}>
                <View onLayout={(e)=>{
                    if(this.state.titleTxt == 0){
                        this.setState({
                            titleTxt: e.nativeEvent.layout.width,
                        });
                    }
                }}>
                    <Text style={[ProjectStyle.textCaption,ProjectColor.textWeight,{fontWeight:"bold"}]}>{title}</Text>
                </View>
                <View style = {{width: NavigationHelper.SCREEN_WIDTH - 32 - 60 - 8 - this.state.titleTxt}}>
                    <Text style={[ProjectStyle.textCaption,ProjectColor.textWeight,{fontWeight:"bold"}]} numberOfLines={lineNum}>{content}</Text>
                </View>
            </View>
        )
    }

    renderItem = (item) => {
        return (
            <View style={{flexDirection: "row",paddingVertical: 8,paddingHorizontal: 16,backgroundColor:"#FFF"}}>
                <View>
                    <Image source={{uri: "https://img.ltn.com.tw/Upload/news/600/2018/12/11/phpGFBDNm.jpg"}} style={{width: 60,height:60,}}/>
                </View>
                <View style={{padding:4,}}>
                    {this.renderText(COLUMN_TYPE.effect,item.effectTitle)}
                    {this.renderText(COLUMN_TYPE.reference,item.reference)}
                    {this.renderText(COLUMN_TYPE.youtubeLink,item.youtubeLink)}
                </View>
            </View>
        )
    }

    renderList = () => {
        let data = this.state.data;
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
