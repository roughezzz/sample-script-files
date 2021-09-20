import React, {useRef, useEffect} from 'react';
import { Animated, View, Text, Image, StyleSheet, Easing } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import InitialsView from "../InitialsView/InitialsView";

import { fonts, colors, dimens, globalStyles } from "../../global/Styles";


type Props = {
    nameInitials: string,
    name: string,
    seccondaryText: string,
    thirdText: string
}
export const RecipientListDemo = ({nameInitials, name, seccondaryText, thirdText}: Props) =>{

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animatedValue,{
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                delay: 1000
            }),
            Animated.timing(animatedValue,{
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                delay: 2000
            }),
        ]).start(async ({finished}) => {
            if(finished){
                // await AsyncStorage.setItem('_FIRSTTIME_', 'NO');
                await AsyncStorage.removeItem('_FIRSTTIME_');
            }
        });
    })

    return(
        <View>
            <Animated.View style={{
                flexDirection: "row",
                // marginTop: 10,
                transform:[
                    {
                        translateX: animatedValue.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,-120]
                        })
                    }
                ]
                
            }}>
                <View style={defaultStyles.body}>
                    <InitialsView 
                        containerStyle={defaultStyles.initialBody} 
                        textStyle={defaultStyles.initialText} 
                        imageStyle={defaultStyles.avaterStyle}
                        name={nameInitials}
                    />
                    <View style={defaultStyles.textGroupView}>
                        <Text style={defaultStyles.nameText}>{name}</Text>
                        <Text style={defaultStyles.emailText}>{seccondaryText}</Text>
                        <Text style={defaultStyles.emailText}>{thirdText}</Text>
                    </View>
                </View>
                <Animated.View style={{flexDirection: "row"}}>
                    <View style={[defaultStyles.swipeableOption,{backgroundColor: colors.secondaryColor}]}>
                        <Image source={require("../../../assets/images/delete-bin-white.png")} />
                    </View>

                    <View style={[defaultStyles.swipeableOption,{backgroundColor: colors.primaryColor}]}>
                        <Image source={require("../../../assets/images/withdraw_white.png")} />
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    )
}

const defaultStyles = StyleSheet.create({
    body:{
        height: 70,
        width: "100%",
        flexDirection:"row",
        marginVertical: 20,
        paddingLeft: dimens.appLeftMargin,
        alignItems: 'center'
    },
    initialBody: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 55,
        // backgroundColor: colors.secondaryColor,
        borderRadius: 27
    },
    initialText:{
        fontSize: 16,
        fontFamily: fonts.mediumFont
    },
    avaterStyle: {
        height: 35,
        width: 35,
    },
    textGroupView: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 14,
    },
    nameText:{
        fontSize:  14,
        color:  colors.accentColor,
        fontFamily: fonts.mediumFont,
        marginBottom: 2
    },
    emailText:{
        fontFamily: fonts.regularFont,
        color: colors.thirdPlaceholderColor,
        fontSize: 14
    },
    swipeableOption:{
        width:60, 
        height: 70,
        justifyContent:"center", 
        alignItems:"center"
    }
});
