import api from "../../../Api/axios";

/**
 * Reset passoword
 * @param{string} password
 * @param {string}resetToken
 * 
 * @returns Promise<object>
 */

export const restPassword = async (restPassword, resetToken)=>{
    const response = await api.post("api/auth/reset-password",{
        restPassword,
        resetToken
    });
    
    return response.data;
}

        
export const loginUserApi = async (email , password)=>{
    const response = await api.post("api/auth/login",{
        email: email,
        password: password
    });
    
    const data = response.data;
    localStorage.setItem("jwtToken", data.token); // Also ensure the token key matches App.js, which expects "jwtToken", not "user_token"

    return data;
}