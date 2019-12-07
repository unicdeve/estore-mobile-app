import React, { Component } from 'react'
import { Box } from 'react-native-design-utility'
import ProductCard from '../components/ProductCard'

class CategoryScreen extends Component {

    static navigationOptions = ({ navigation}) => ({
        title: navigation.getParam('name', 'E-store')
    })

    render() {
        return (
            <Box>
                <ProductCard />
            </Box>
        )
    }
}

export default CategoryScreen;
