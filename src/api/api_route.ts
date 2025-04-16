//register all the api routes here

export const API_ROUTE = {
    //authentication routes
    signup: "/auth/register/",
    login: "/auth/login/",
    activate_account: "/auth/activate/account/",

    //profile apis
    profile: "/profile/",
    admin_update_profile: "/profile/",

    //kyc apis
    kyc_verification: "/auth/kyc/apply/",
    admin_get_kyc: "/auth/kyc/status"
    
}