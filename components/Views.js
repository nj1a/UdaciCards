import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'

import { white, red } from '../utils/colours'

export const CardView = ({ children }) => (
    <View style={viewStyles.card}>{children}</View>
)
   
export const ContainerView = ({ children }) => (
    <View style={viewStyles.container}>{children}</View>
)

export const viewStyles = StyleSheet.create({
    card: {
        backgroundColor: white,
        padding: 5,
        margin: 13,
        borderColor: red,
        borderRadius: Platform.OS === 'ios' ? 4 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
})

