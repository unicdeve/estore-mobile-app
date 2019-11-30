import React, { Component } from 'react';
import { Box } from 'react-native-design-utility'
import OnBoardLogo from '../commons/OnBoardLogo';

import { inject } from 'mobx-react/native';


@inject('currentUser')
class SplashScreen extends Component {
    state = {};

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = () => {
        setTimeout(async () => {
            await this.props.currentUser.setupAuth();
        }, 1000);
    }

    render() {
        return (
            <Box f={1} center>
                <OnBoardLogo />
            </Box>
        )
    }
}

export default SplashScreen;
