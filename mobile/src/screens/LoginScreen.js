import React, { Component } from 'react';
import { Alert, Animated } from 'react-native';
import { Box } from 'react-native-design-utility';
import OnBoardLogo from '../commons/OnBoardLogo';
import LoginButton from '../commons/LoginButtons';
import {FacebookApi} from "../api/Facebook";
import {GoogleApi} from "../api/Google";


const BoxAnimated = Animated.createAnimatedComponent(Box);

class LoginScreen extends Component {
    state = {
        opacity: new Animated.Value(0),
        position: new Animated.Value(0),
    };

    opacityAnim = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 300,
            delay: 100
        }).start()
    }

    positionAnim = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    onGooglePress = async () => {
        try {
            const token = await GoogleApi.loginAsync()

            console.log('token', token)
        } catch (e) {
            console.log('error', e);
        }
    }

    onFacebookPress = async () => {
        try {
            const token = await FacebookApi.loginAsync();

            console.log('token', token)
        } catch (e) {
            console.log('error', e);
        }
    }

    componentDidMount() {
        Animated.parallel([this.positionAnim(), this.opacityAnim()]).start()
        this.opacityAnim();
        this.positionAnim();
    }

    render() {
        const { opacity } = this.state;

        const logoTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0],
        }); 

        return (
            <Box f={1} center bg='white'>
                <BoxAnimated 
                    f={1}
                    style={{ 
                        transform: [
                            {
                                translateY: logoTranslate,
                            },
                        ],
                    }}
                >
                    <Box f={1} center>
                        <OnBoardLogo />
                    </Box>
                </BoxAnimated>
                
                <BoxAnimated f={0.9} w="100%" style={{opacity}}>
                    <LoginButton onPress={this.onGooglePress} type="google">
                        Continue with Google
                    </LoginButton>

                    <LoginButton onPress={this.onFacebookPress} type="facebook">
                        Continue with Facebook
                    </LoginButton>
                </BoxAnimated>
            </Box>
        )
    }
}

export default LoginScreen;
