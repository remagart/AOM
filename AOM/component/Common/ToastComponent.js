import {Dimensions} from "react-native";
import Toast from "react-native-root-toast";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class ToastComponent {
    static STATUS_TOAST = {
        DEFAULT: "DEFAULT",
        SUCCESS: "SUCCESS",
        FAIL: "FAIL"
    }

    static showToast(msg,status){
        let option = {
            backgroundColor: "rgba(0,0,0,0.8)",
            textColor: "rgb(255,255,255)",
        }
        if(status == this.STATUS_TOAST.SUCCESS){
            option = {
                backgroundColor: "rgba(226,255,233,0.9)",
                textColor: "rgb(40,167,69)",
            }
        }
        else if(status == this.STATUS_TOAST.FAIL){
            option = {
                backgroundColor: "rgba(255,239,242,0.9)",
                textColor: "rgb(230,44,35)",
            }
        }
        else if(status == this.STATUS_TOAST.DEFAULT){
            option = {
                backgroundColor: "rgba(0,0,0,0.8)",
                textColor: "rgb(255,255,255)",
            }
        }

        Toast.show(msg,{
            ...option,
            containerStyle:{
                minHeight: 48,
                width: SCREEN_WIDTH - 32,
                marginHorizontal: 16,
                justifyContent: "center"
            },
            duration: 3000,
            position: Toast.positions.TOP,
            animation: true,
            hideOnPress: true,
            shadow: false,
            delay: 0,
            opacity: 1,
        });
    }
}