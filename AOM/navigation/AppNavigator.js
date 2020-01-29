import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import NavigatorScreenName from "./NavigatorScreenName";
import NavigatorScreenManager from "./NavigatorScreenManager";

const RootNavigator = createStackNavigator({
    [NavigatorScreenName.FlashCardScreen]:{
        screen: NavigatorScreenManager.FlashCardScreen,
    },
    [NavigatorScreenName.NewCard]:{
        screen: NavigatorScreenManager.NewCard,
    },
    [NavigatorScreenName.MyFlashCard]:{
        screen: NavigatorScreenManager.MyFlashCard,
    },
    [NavigatorScreenName.AllFlashCard]:{
        screen: NavigatorScreenManager.AllFlashCard,
    },
},{
    navigationOptions:{
        
    },
});

export default createAppContainer(RootNavigator);


