"use client";
import { useUserProfile } from "@/api/profile"
import { useEffect, useState } from "react"
import {useMount} from "react-use"


interface UserProfile {
    user: {
      first_name: string;
      last_name: string;
      [key: string]: unknown; // Add other fields as needed
    };
    [key: string]: unknown;
  }

export const useProfile=()=>{
    const [profileData, setprofileData] = useState<UserProfile | null>(null);
    const {data: getProfileData, error, refetch} = useUserProfile()


    useEffect(()=>{
        if (getProfileData && getProfileData.data) {
            const { data } = getProfileData;
            const transformedData: UserProfile = {
                user: {
                  first_name: data.first_name as string,
                  last_name: data.last_name as string,
                  ...data, // Include other fields if needed
                },
              };
        
              authenticate(transformedData);
          }
    }, [getProfileData])



    const authenticate=(data: UserProfile)=>{
        setprofileData(data);
        // setAuthenticated(true)
    }

    const reloadUser=async()=>{
        await refetch();
    }


    useMount(()=>{
            if(!profileData){
                reloadUser()
            }
    })



    return {
        profileData,
        error,
        reloadUser
    }



}