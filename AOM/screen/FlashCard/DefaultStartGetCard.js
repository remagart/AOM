import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default class DefaultStartGetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> DefaultStartGetCard </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})
