import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import NavigatorScreenName from "./NavigatorScreenName";
import NavigatorScreenManager from "./NavigatorScreenManager";

const RootNavigator = createStackNavigator({
    [NavigatorScreenName.FlashCardScreen]:{
        screen: NavigatorScreenManager.FlashCardScreen,
    },
    [NavigatorScreenName.DefaultStartGetCard]:{
        screen: NavigatorScreenManager.DefaultStartGetCard,
    },
    [NavigatorScreenName.MyFlashCard]:{
        screen: NavigatorScreenManager.MyFlashCard,
    }
},{
    navigationOptions:{
        
    },
});

export default createAppContainer(RootNavigator);


