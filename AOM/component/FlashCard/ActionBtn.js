import React, { Component } from 'react';
import { View, Text,StyleSheet,ToastAndroid } from 'react-native';
import ActionButton from "react-native-action-button";
import Icon_ionicons from "react-native-vector-icons/dist/Ionicons";
import Icon_AntDesign from "react-native-vector-icons/dist/AntDesign";
import Icon_MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Icon_MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import {ProjectStyle,ProjectColor} from "../../style/index";
import NavigatorScreenName from "../../navigation/NavigatorScreenName";
import NavigationHelper from "../../Utils/NavigationHelper";

const ACTIONBTN_HEIGHT = 66;
const imgStyle = {...ProjectColor.main,fontSize:27,};
const ICON_ALL_CARD = <Icon_MaterialCommunityIcons name={"cards-playing-outline"} style={imgStyle}/>;
const ICON_ADD_CARD = <Icon_MaterialIcons name={"library-add"} style={imgStyle}/>

export default class ActionBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onClickedWatchAllCard = () => {
    }

    onClickedAddCard = () => {
        requestAnimationFrame(()=>{
            NavigationHelper.navigate(NavigatorScreenName.NewCard);
        });
    }

    renderInactiveIcon = () => {
        return (
            <View style={styles.actionBtnActive}>
                <Icon_AntDesign name={"plus"} style={{ fontSize: 27, }}/>
            </View>
        );
    }

    renderActiveIcon = () => {
        return (
            <View style={styles.actionBtnActive}>
                <Icon_AntDesign name={"plus"} style={{ fontSize: 27, }}/>
            </View>
        );
    }

    renderIcon = (active) => {
        return(
            <View>
                {(active)?this.renderActiveIcon():this.renderInactiveIcon()}
            </View>
        );  
    }

    renderBtnItem = (IconItem,title,onPress) => {
        let borderColor = {borderColor: ProjectColor.main.color};
        
        return (
            <ActionButton.Item 
                buttonColor='transparent' 
                spaceBetween = {-5}
                textContainerStyle = {styles.txtContainer}
                textStyle = {styles.textStyle}
                title= {title}
                hideLabelShadow = {true}
                onPress={() => {onPress()}}
            >
                <View style={[styles.btnItem,borderColor]}>
                    {IconItem}
                </View>
            </ActionButton.Item>
        );
    }

    render() {
        return (
            <ActionButton 
                ref={ref=>this.actionBtnRef = ref}
                style={{justifyContent: "center"}}
                buttonColor= "transparent" 
                bgColor="rgba(0,0,0,0.8)"
                offsetX={17}
                offsetY={20}
                size = {ACTIONBTN_HEIGHT}
                spacing = {0}
                hideShadow={true}
                useNativeFeedback={false}
                // degrees = {0}
                renderIcon = {(active)=>(this.renderIcon(active))}
            >
                {this.renderBtnItem(ICON_ALL_CARD,"看全部卡片",()=>{this.onClickedWatchAllCard()})}
                {this.renderBtnItem(ICON_ADD_CARD,"新增卡片",()=>{this.onClickedAddCard()})}
            </ActionButton>
        );
    }
}

const styles = StyleSheet.create({
    txtContainer:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: "transparent",
        opacity: 1,
        shadowOpacity: 1,
        elevation: 0,
        height: 30,
        // top = (圖片高  - 文字Container高 30 ) / 2 
        top: (ACTIONBTN_HEIGHT - 30) / 2,

    },
    textStyle:{
        color: "#FFFFFF",
        fontSize: 17,
    },
    actionBtnActive: {
        height: 54,
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ProjectColor.main.color,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 27,
    },
    btnItem:{
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
})

