import {Dimensions} from "react-native";

export default class NavigationHelper {
    static navigatorRef = null;
    static SCREEN_WIDTH = Dimensions.get("screen").width;
}