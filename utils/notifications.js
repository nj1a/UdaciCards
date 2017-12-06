import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_ASYNC_STOREAGE_KEY = 'UdaciCards:notifications'

const localNotification = {
    title: 'Practice a quiz today!',
    body: "Don't forget to practice a bit",
    ios: {
        sound: true,
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
    },
}

export const setLocalNotification = async () => {
    const data = await AsyncStorage.getItem(NOTIFICATION_ASYNC_STOREAGE_KEY)
    const json = JSON.parse(data)

    if (json === null) {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
 
            // set notification to fire at 7pm every day
            let fireTime = new Date()
            fireTime.setDate(fireTime.getDate())
            fireTime.setHours(19)
            fireTime.setMinutes(0)
        
            Notifications.scheduleLocalNotificationAsync(localNotification, {
                time: fireTime,
                repeat: 'day',
            })
            AsyncStorage.setItem(NOTIFICATION_ASYNC_STOREAGE_KEY, JSON.stringify(true))
        }
    }
}

export const clearLocalNotification = () => (
    AsyncStorage.removeItem(NOTIFICATION_ASYNC_STOREAGE_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
)
