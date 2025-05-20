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
  admin_get_kyc: "/auth/kyc/status/",
  admin_get_kyc_detail: "/auth/kyc/approve/",
  admin_approve_reject_kyc: "/auth/kyc/approve/",

  //vtu apis
  get_data_plans: "/vtu/services/", //needs query param as suffix
  buy_utility_service: "/vtu/services/",

  //transactions
  get_transactions: "/transactions/",
};
