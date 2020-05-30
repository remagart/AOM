// @refresh reset
import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,
        TouchableWithoutFeedback,TouchableOpacity,
        Keyboard } from 'react-native';
import {ProjectColor,ProjectStyle} from "../../style/index";
import NavigationHelper from "../../Utils/NavigationHelper";
import NavigatorScreenName from "../../navigation/NavigatorScreenName";
import ActionBtn from "../../component/FlashCard/ActionBtn";
import ToastComponent from "../../component/Common/ToastComponent";
import LocalSQLite from "../../Utils/SQLite/LocalSQLite";

const FOCUS_COLOR = "rgba(0,0,0,0.8)";
const COLUMN_TYPE = {
    EMPTY: "",
    EFFECT_TITLE: "EFFECT_TITLE",
    REFERENCE: "REFERENCE",
    YOUTUBE_LINK: "YOUTUBE_LINK",
}

export default class NewCard extends Component {
    constructor(props) {
        super(props);

        this.editTxtEffectRef = null;
        this.editTxtReferenceRef = null;
        this.editTxtYoutubeLinkRef = null;
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;

        this.sqlite = new LocalSQLite();
        
        this.state = {
            onFocusColumn: COLUMN_TYPE.EMPTY,
            onFocusEditRef: null,

            editTxtEffectWidth: 0,
            editTxtReferenceWidth: 0,
            editTxtYoutubeLinkWidth: 0,

            effectTitle: "",
            reference: "",
            youtubeLink: "",

            isKeyboardShow: false,

            currentUserTableId: 0,     // The final data id which in the table of userFlashCard
        };
    }

    async componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow",this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide",this.keyboardHide);
        
        let userData = await this.sqlite.selectAllUsers();
        console.log("userData",userData);

        if(userData && userData.length > 0){
            this.setState({currentUserTableId: userData.length});
        }
    }

    componentWillUnmount(){
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardShow = () => {
        this.setState({isKeyboardShow: true});
    }

    keyboardHide = () => {
        this.setState({isKeyboardShow: false,});

        // Because ActionBtn will flash a moment when keyboard is active
        (this.state.onFocusEditRef)? this.state.onFocusEditRef.blur():null;
    }

    onClickedAdd = async () => {
        if(this.state.effectTitle == ""){
            ToastComponent.showToast("請輸入效果名稱喔",ToastComponent.STATUS_TOAST.FAIL);
            return;
        }

        let id = this.state.currentUserTableId;
        let ef = this.state.effectTitle;
        let re = this.state.reference;
        let you = this.state.youtubeLink
        await this.sqlite.addUser(id,ef,re,you);
        this.setState({
            currentUserTableId: id + 1,
            effectTitle: "",
            reference: "",
            youtubeLink: "",
        })

        ToastComponent.showToast("新增成功",ToastComponent.STATUS_TOAST.SUCCESS);
    }

    onClickedClear = () => {
        this.setState({
            effectTitle: "",
        });

        (this.editTxtEffectRef)? this.editTxtEffectRef.clear():null;
    }

    renderInputEffectTitle = () => {
        let w = (this.state.editTxtEffectWidth != 0)? NavigationHelper.SCREEN_WIDTH - 32 - this.state.editTxtEffectWidth : 0;
        let underLineColor = (this.state.onFocusColumn == COLUMN_TYPE.EFFECT_TITLE)? FOCUS_COLOR : styles.edittextBottomLine.borderBottomColor;
        return (
            <View style={styles.blockInputView}>
                <View onLayout={(e)=>{
                    this.setState({editTxtEffectWidth: e.nativeEvent.layout.width,});
                }}>
                    <Text style={[ProjectStyle.textH4,ProjectColor.textNormal,{fontWeight:"bold"}]}>效果名稱：</Text>
                </View>
                <TextInput 
                    ref = {(ref)=>{this.editTxtEffectRef = ref}}
                    placeholder = {"必填"}
                    style={[styles.edittextView,styles.edittextBottomLine,{width: w,borderBottomColor:underLineColor}]}
                    selectionColor = {FOCUS_COLOR}
                    onFocus = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.EFFECT_TITLE,onFocusEditRef:this.editTxtEffectRef})}}
                    onBlur = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.EMPTY})}}
                    onChangeText={(txt)=>{
                        this.setState({effectTitle: txt});
                    }}
                    value = {this.state.effectTitle}
                />
            </View>
        )
    }

    renderInputReference = () => {
        let w = (this.state.editTxtReferenceWidth != 0)? NavigationHelper.SCREEN_WIDTH - 32 - this.state.editTxtReferenceWidth : 0;
        let underLineColor = (this.state.onFocusColumn == COLUMN_TYPE.REFERENCE)? FOCUS_COLOR : styles.edittextBottomLine.borderBottomColor;
        return (
            <View style={styles.blockInputView}>
                <View onLayout={(e)=>{
                    this.setState({editTxtReferenceWidth: e.nativeEvent.layout.width,});
                }}>
                    <Text style={[ProjectStyle.textH4,ProjectColor.textNormal,{fontWeight:"bold"}]}>參考資訊：</Text>
                </View>
                <TextInput 
                    ref = {(ref)=>{this.editTxtReferenceRef = ref}}
                    placeholder = {"選填"}
                    style={[styles.edittextView,styles.edittextBottomLine,{width: w,borderBottomColor:underLineColor}]}
                    selectionColor = {FOCUS_COLOR}
                    onFocus = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.REFERENCE,onFocusEditRef:this.editTxtReferenceRef})}}
                    onBlur = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.EMPTY})}}
                    onChangeText={(txt)=>{
                        this.setState({reference: txt});
                    }}
                    value = {this.state.reference}
                />
            </View>
        )
    }

    renderInputYoutubeLink = () => {
        let w = (this.state.editTxtYoutubeLinkWidth != 0)? NavigationHelper.SCREEN_WIDTH - 32 - this.state.editTxtYoutubeLinkWidth : 0;
        let underLineColor = (this.state.onFocusColumn == COLUMN_TYPE.YOUTUBE_LINK)? FOCUS_COLOR : styles.edittextBottomLine.borderBottomColor;
        return (
            <View style={styles.blockInputView}>
                <View onLayout={(e)=>{
                    this.setState({editTxtYoutubeLinkWidth: e.nativeEvent.layout.width,});
                }}>
                    <Text style={[ProjectStyle.textH4,ProjectColor.textNormal,{fontWeight:"bold"}]}>Youtube連結：</Text>
                </View>
                <TextInput 
                    ref = {(ref)=>{this.editTxtYoutubeLinkRef = ref}}
                    placeholder = {"選填"}
                    style={[styles.edittextView,styles.edittextBottomLine,{width: w,borderBottomColor:underLineColor}]}
                    selectionColor = {FOCUS_COLOR}
                    onFocus = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.YOUTUBE_LINK,onFocusEditRef:this.editTxtYoutubeLinkRef})}}
                    onBlur = {()=>{this.setState({onFocusColumn: COLUMN_TYPE.EMPTY})}}
                    onChangeText={(txt)=>{
                        this.setState({youtubeLink: txt});
                    }}
                    value = {this.state.youtubeLink}
                />
            </View>
        )
    }

    renderBtn = () => {
        let addBtnStyle = (this.state.effectTitle != "")? {}:{backgroundColor: "transparent",borderColor: ProjectColor.main.color,}
        return (
            <View style={{flexDirection:'row',justifyContent: "center"}}>
                <TouchableOpacity onPress={()=>{this.onClickedAdd()}}>
                    <View style={[styles.btnView,addBtnStyle]}>
                        <Text style={[ProjectStyle.textH4,ProjectColor.textNormal]}>新增</Text>
                    </View>
                </TouchableOpacity>
                

                <View style={{width: 16}}/>
                
                <TouchableOpacity onPress = {()=>{this.onClickedClear()}}>
                    <View style={[styles.btnView,styles.clearBtnView]}>
                        <Text style={[ProjectStyle.textH4,ProjectColor.textNormal]}>清除</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={()=>{(this.state.onFocusEditRef)? this.state.onFocusEditRef.blur():null;}}>
                <View style={styles.container}>
                    {this.renderInputEffectTitle()}
                    {this.renderInputReference()}
                    {this.renderInputYoutubeLink()}
                    <View style={{height: 30}}/>
                    {this.renderBtn()}


                    {/* need to put on the bottom of render() */}
                    {(this.state.isKeyboardShow == true || this.state.onFocusColumn != COLUMN_TYPE.EMPTY)?
                        null : <ActionBtn /> 
                    }
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        ...ProjectColor.background,
        flex: 1,
    },
    blockInputView:{
        width: NavigationHelper.SCREEN_WIDTH - 32,
        marginHorizontal: 16,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    edittextView:{
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 2,
    },
    edittextBottomLine:{
        borderBottomColor: 'rgba(0,0,0,0.15)',
        borderBottomWidth: 1,
        width: "50%",
    },
    btnView: {
        backgroundColor: ProjectColor.main.color,
        width: 100,
        height: 40,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    clearBtnView:{
        backgroundColor: "#ff999f",
    },
})
