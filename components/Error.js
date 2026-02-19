import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'


const propTypes = {
    errorText1: PropTypes.string,
    errorText2: PropTypes.string 
}


const defaultProps = {
    errorText1 : 'Oops! Something went wrong.',
    errorText2 : 'Check your internet connection and restart app.',
}


const Error = (props) => {

    const {errorText1, errorText2} = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{errorText1}</Text>    
            <Text style={styles.text}>{errorText2}</Text>    
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: { 
        fontWeight: 'bold',
      },
})

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;


export default Error;
