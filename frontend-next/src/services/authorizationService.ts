import { UserBaseResponse, UserInfo, UserResponse } from '@/domain/interfaces/userInterfaces';
import dotenv from 'dotenv'
dotenv.config();

class AuthorizationService{
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:5000';
    }

    async Login(userInfo : UserInfo) : Promise<UserBaseResponse>{
        try{
            const urlAuth = `${this.baseURL}/api/auth`;

            const response = await fetch(urlAuth, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if (!response.ok)
                return {
                    isSuccess: false,
                    status: response.status,
                    message: response.statusText,
                    data: null
                };

            return {
                isSuccess: true,
                status: response.status,
                message: null,
                data: await response.json()
            };
        }
        catch( err : any){
            return {
                isSuccess: false,
                data: null,
                message: err.message,
                status: 500
            };
        }
    }
}

export default AuthorizationService; 