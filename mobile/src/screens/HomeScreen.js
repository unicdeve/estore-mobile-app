import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import CategoryCard from '../components/CategoryCard';
import { theme } from '../constants/theme';
import DealCarousel from '../components/DealCarousel';


const categories = [
    {
        id: 1,
        title: "Grocery",
        image: require('../../assets/img/categories/cart.png')
    },
    {
        id: 2,
        title: "Drugs",
        image: require('../../assets/img/categories/drugs.png')
    },
    {
        id: 3,
        title: "Pets",
        image: require('../../assets/img/categories/pets.png')
    },
    {
        id: 4,
        title: "Video Games",
    },
]


const NUM_COLUMNS = 3;

class HomeScreen extends Component {
    static navigationOptions = {
        title: "E-store"
    }

    renderItem = ({item, index}) => {
        let style = {};

        if(index % NUM_COLUMNS !== 0) {
            style.borderLeftWidth = 2;
            style.borderLeftColor = theme.color.greyLighter;
        }

        return (
            <Box w={1 / 3} bg="white" h={120} style={style}>
                <CategoryCard { ...item } />
            </Box>
        )
    }

    keyExtractor = item => String(item.id);

    seperator = () => <Box h={2} bg='greyLighter' />

    render() {
        return (
            <Box f={1}>
                <StatusBar barStyle="light-content" />
                <Box h={130} w="100%">
                    <DealCarousel />
                </Box>

                <Box f={1}>
                    <FlatList
                        data={categories}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        numColumns={NUM_COLUMNS}
                        ItemSeparatorComponent={this.seperator}
                    />
                </Box>
            </Box>
        )
    }
}

export default HomeScreen;
