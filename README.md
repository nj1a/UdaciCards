This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Instructions

You can download this project and simply `yarn install` and `yarn start` (or `npm install` and `npm start`) to start the app.

## Platforms tested

Most of the manual testing was performed on iOS (with expo), but some was done with Android. Some glitches in Android, however, are not fixed for this submission.

## Issues

- The TextInputs in the AddDeckView and AddQuestionView do not respond correctly (move up) when a keyboard shows up. The currecnt workaround is to put TextInputs at the top and control their heights so the keyboard doesn't have to push TextInputs upwards. I also tried `react-native-keyboard-aware-scrollview` but it didn't seem to work well with multiline TextInputs.

- The local notification seems unstable, and sometimes it doesn't show up even in Android.
