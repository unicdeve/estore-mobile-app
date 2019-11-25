import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { images } from '../constants/images';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../constants/theme';


const bgColor = type => {
    switch(type) {
        case 'google':
            return 'googleBlue'
        
        case 'facebook':
            return 'facebookBlue'

        default:
            return 'white'
    }
}

const LoginButton = ({ children, type, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Box 
            dir='row' 
            align='center' 
            shadow="1" 
            bg={bgColor(type)}
            w="80%" 
            self="center" 
            p='2xs' 
            radius='2xl'
            mb='sm'
        >
            <Box mr='sm'>
                <Box radius='2xl' bg='white' h={32} w={32} center>
                    {type === 'google' && <Image source={images.google} />}
                    {type === 'facebook' && <FontAwesome size={30} name='facebook' color={theme.color.facebookBlue} />}
                </Box>
            </Box>
            <Box>
                <Text size='md' color="white">{ children }</Text>
            </Box>
        </Box>
    </TouchableOpacity>
)

export default LoginButton;