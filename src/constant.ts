export const baseUrl = "http://192.180.0.127:4040/api/";
export const chatconnection='http://192.180.0.127:4040/ChatHub'
export const ImageLink='http://192.180.0.127:4040/'
export const constant = {
    Auth : {
       login: 'User/Login',
       signIn: 'User/Register',
       forgot: 'Password/ForgetPassword',
       reset:'Password/ResetPassword'
   },
   User:{
    search:'User/Search'
   }

}
export const navLink=[
    {
    name:'Change Password',
    click:'changePassword'
    },
    {
    name:'Start chat',
    click:'startChat'
    },
    {
    name:'Update',
    click:'updateProfile'
    },
    {
    name:'LogOut',
    click:'logOut'
    },
]