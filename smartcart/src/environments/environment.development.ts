export const environment = {
    baseUrl: 'http://localhost:1337/',
    login: 'api/auth/local',
    register: 'api/auth/local/register',
    user_detail: 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
    update_user: 'api/users'
};
