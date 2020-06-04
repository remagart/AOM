import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';
import {ProjectStyle,ProjectColor} from "../../style";
import NavigationHelper from "../../Utils/NavigationHelper";
import NavigatorScreenName from "../../navigation/NavigatorScreenName";
import ActionBtn from "../../component/FlashCard/ActionBtn";
import LocalStorage from "../../Utils/LocalStorage";

export default class FlashCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    onClickedStartFlashCard = () => {
        requestAnimationFrame(()=>{
            this.props.navigation.navigate(NavigatorScreenName.MyFlashCard);
        });
    }

    renderDefaultFlashCard = () => {
        return (
            <TouchableOpacity onPress={()=>{this.onClickedDefaultFlashCard()}}>
                <View style={styles.btnView}>
                    <Text style={[ProjectStyle.textBody1,ProjectColor.textNormal]}>新增卡片</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderStartFlashCard = () => {
        return (
            <TouchableOpacity onPress={()=>{this.onClickedStartFlashCard()}}>
                <View style={styles.btnView}>
                    <Text style={[ProjectStyle.textBody1,ProjectColor.textNormal]}>開始抽卡</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderStartFlashCard()}

                {/* need to put on the bottom of render() */}
                <ActionBtn />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...ProjectColor.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnView:{
        backgroundColor: "rgb(200,200,200)",
        width: (NavigationHelper.SCREEN_WIDTH - 32),
        height: 50,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
})