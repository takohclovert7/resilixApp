import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import CommunityChat from '../../components/menuComponent/communityChat';
import ChangeProfileInfo from '../../components/menuComponent/changeProfileInfo';
import ViewRecentDisastersStack from '../../components/menuComponent/viewRecentDisasterStack';
import AddFamilyMember from '../../components/menuComponent/addFamilyMember';
import ViewFamilyMember from '../../components/menuComponent/viewFamilyMember';



const SidebarScreen = ({route}) => {
   
    const {screenName}=route.params;

  
    if(screenName==="viewRecentDisaster"){
        return <ViewRecentDisastersStack />
    }
    if(screenName==="profileInfo"){
        return <ChangeProfileInfo  />
    }
    if(screenName==="communityChat"){
        return <CommunityChat />
    }
    if(screenName==="addFamilyMember"){
        return <AddFamilyMember />
    }
    if(screenName==="ViewFamilyMember"){
        return <ViewFamilyMember />
    }
    
}



export default SidebarScreen;
