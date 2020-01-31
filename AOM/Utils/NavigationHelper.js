import {Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";
import {Header} from "react-navigation-stack";

export default class NavigationHelper {
    static navigatorRef = null;
    static SCREEN_WIDTH = Dimensions.get("screen").width;
    static HEADER_HEIGHT = Header.HEIGHT;

    static navigate = async (screen,params={}) => {
        if(this.navigatorRef === null || this.navigatorRef === undefined){
            console.log("Invalid navigator ref");
            return;
        }
        this.navigatorRef.dispatch(NavigationActions.navigate({routeName: screen,params: params}));
    }

}