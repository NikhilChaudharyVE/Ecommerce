import axios from 'axios'
const apiBaseUrl=process.env.REACT_APP_API_BASE_URL ;
const UserApi=axios.create({
    baseURL:apiBaseUrl,
});
// forgot api
 const forgotPassApi =async (email,newPassword,answer) => {
    const forgot=await axios.post(`${apiBaseUrl}/forget-password`,{
        email,newPassword,answer
    })
    return forgot;
    };
    // login api
    const loginApi=async (email,password) => {
        const login=await axios.post(`${apiBaseUrl}/login`,{
    email,password});
    return login;
        }
        // user REgister api
        const userRegisterApi=async (firstName,lastName,email,password,phone,address,answer) => {
        const register= await axios.post(`${apiBaseUrl}/signup`,{
            firstName,lastName,email,password,phone,address,answer
        });
        return register;
        }
export { UserApi, forgotPassApi,loginApi ,userRegisterApi};