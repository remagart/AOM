import {Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";

export default class NavigationHelper {
    static navigatorRef = null;
    static SCREEN_WIDTH = Dimensions.get("screen").width;

    static navigate = async (screen,params={}) => {
        if(this.navigatorRef === null || this.navigatorRef === undefined){
            console.log("Invalid navigator ref");
            return;
        }
        this.navigatorRef.dispatch(NavigationActions.navigate({routeName: screen,params: params}));
    }

}