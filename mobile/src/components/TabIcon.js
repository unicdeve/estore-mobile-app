import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { tabBarIcons } from '../constants/images';


class TabIcon extends PureComponent {

    handlePress = () => {
        this.props.navigation.navigate(this.props.routeName);
    }

    render() {
        const { routeName, isActive } = this.props;

        const icon = tabBarIcons[isActive ? 'active': 'Inactive'][routeName];
        return (
            <Box f={1} pt={10}>
                <TouchableOpacity onPress={this.handlePress} style={styles.buttons}>
                    <Box mb={3}>
                        <Image source={icon} />
                    </Box>

                    <Box>
                        <Text ls={0.12} size="xs" color="greyDark" lowercase>{routeName}</Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TabIcon;