import { GetUserResponse, UserDataResponse, UserResponse } from '@/domain/interfaces/userInterfaces';
import dotenv from 'dotenv';
dotenv.config();

class UserService {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:5000';
    }

    async getUser(externalID: string, token: string): Promise<GetUserResponse> {
        try {
            const url = `${this.baseURL}/api/users/external/${externalID}`;

            const userResponse = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (userResponse.ok)
                return {
                    isSuccess: true,
                    data: await userResponse.json(),
                    message: null,
                    status: userResponse.status
                };
            else
                return {
                    isSuccess: false,
                    data: await userResponse.json(),
                    message: userResponse.statusText,
                    status: userResponse.status
                };

        }
        catch (err: any) {
            return {
                isSuccess: false,
                data: null,
                message: err.message,
                status: 500
            };
        }
    }
}

export default UserService;