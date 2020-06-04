import React, { Component } from 'react'
import { Text, View,StyleSheet,FlatList,Image,Dimensions } from 'react-native';
import {ProjectColor,ProjectStyle} from "../../style/index";
import NavigationHelper from "../../Utils/NavigationHelper";
import ActionBtn from "../../component/FlashCard/ActionBtn";
import APIManager from "../../Utils/Fetch/APIManager";
import LocalSQLite from '../../Utils/SQLite/LocalSQLite';
import FetchAllCard from '../../Utils/Fetch/AllFlashCardData/FetchAllCard';
import StringHelper from '../../Utils/StringHelper';

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 67.5;

const COLUMN_TYPE = {
    effect:{
        title: " ",      // 效果名稱
        column_type: "effect",
        fontSize: ProjectStyle.textBody1,
        style: {fontWeight: "bold",...ProjectColor.textWeight},
    },
    reference: {
        title: " ",     // 參考資訊
        column_type: "reference",
        fontSize: ProjectStyle.textCaption,
        style: {...ProjectColor.textNormal},
    },
    youtubeLink: {
        title: " ",      // Youtube連結
        column_type: "youtubeLink",
        fontSize: ProjectStyle.textSmallest,
        style: {},
    },
}

export default class AllFlashCard extends Component {
    constructor(props){
        super(props);

        this.fetchLib = new FetchAllCard();

        this.state = {
            titleTxt: 0,
            data: [],
        }
    }

    async componentDidMount(){
        this.isMount = true;
        await this.fetchData();
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

    fetchData = async () => {
        let data = await this.fetchLib.fetchAllCardData();
        console.log("data",data);
        this.setStateDidMount({data: data});
    }

    renderSeperate = () => {
        return (
            <View style={[ProjectColor.separator,{height:1,width: "100%"}]}/>
        )
    }

    renderYoutubeLinkTxt = (title,content,lineNum) => {
        return (
            <View style={{width: NavigationHelper.SCREEN_WIDTH - 32}}>
                <Text style={[ProjectStyle.textCaption,ProjectColor.textLight]} numberOfLines={lineNum}>{content}</Text>
            </View>
        )
    }

    renderText = (obj,content) => {
        let title = obj.title;
        let lineNum = 3;
        switch(obj.column_type){
            case COLUMN_TYPE.effect.column_type: lineNum = 2; break;
            case COLUMN_TYPE.reference.column_type: lineNum = 3; break;
            case COLUMN_TYPE.youtubeLink.column_type: lineNum = 0; break;
        }

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
                <View style = {{width: NavigationHelper.SCREEN_WIDTH - 32 - IMAGE_WIDTH - 8 - this.state.titleTxt}}>
                    <Text style={[obj.fontSize,obj.style]} numberOfLines={lineNum}>{content}</Text>
                </View>
            </View>
        )
    }

    renderItem = (item) => {
        let yt_id = item && StringHelper.fotmatYT(item.youtubeLink);
        if(!yt_id)  yt_id = "no_image";
        else        yt_id = `http://img.youtube.com/vi/${yt_id}/0.jpg`;
        
        return (
            <View style={{paddingVertical: 8,paddingHorizontal: 16,backgroundColor:"#FFF"}}>
                <View style={{flexDirection: "row",marginBottom: 8}}>
                    <View style={{marginTop: 8}}>
                        <Image source={{uri: yt_id}} style={{width: IMAGE_WIDTH,height:IMAGE_HEIGHT,}}/>
                    </View>
                    <View style={{paddingHorizontal:4,}}>
                        {this.renderText(COLUMN_TYPE.effect,item.effectTitle)}
                        {this.renderText(COLUMN_TYPE.reference,item.reference)}
                    </View>
                </View>
                {this.renderText(COLUMN_TYPE.youtubeLink,item.youtubeLink)}
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
