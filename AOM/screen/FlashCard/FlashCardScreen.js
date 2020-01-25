import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import {ProjectStyle,ProjectColor} from "../../style";
import NavigationHelper from "../../Utils/NavigationHelper";
import NavigatorScreenName from "../../navigation/NavigatorScreenName";

export default class FlashCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onClickedDefaultFlashCard = () => {
        ToastAndroid.show("Clicked",ToastAndroid.LONG);
        requestAnimationFrame(()=>{
            this.props.navigation.navigate(NavigatorScreenName.DefaultStartGetCard);
        });
    }

    onClickedMyFlashCard = () => {
        ToastAndroid.show("Clicked",ToastAndroid.LONG);
        requestAnimationFrame(()=>{
            this.props.navigation.navigate(NavigatorScreenName.MyFlashCard);
        });
    }

    renderDefaultFlashCard = () => {
        return (
            <TouchableOpacity onPress={()=>{this.onClickedDefaultFlashCard()}}>
                <View style={styles.btnView}>
                    <Text style={[ProjectStyle.textBody1,ProjectColor.textNormal]}>預設抽認卡</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderMyFlashCard = () => {
        return (
            <TouchableOpacity onPress={()=>{this.onClickedMyFlashCard()}}>
                <View style={styles.btnView}>
                    <Text style={[ProjectStyle.textBody1,ProjectColor.textNormal]}>我的抽認卡</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderDefaultFlashCard()}
                <View style = {{width: 8}} />
                {this.renderMyFlashCard()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...ProjectColor.background,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnView:{
        backgroundColor: "rgb(200,200,200)",
        width: (NavigationHelper.SCREEN_WIDTH - 32 - 4) / 2,
        height: 50,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
})