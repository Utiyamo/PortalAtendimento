import dotenv from 'dotenv';
dotenv.config();

class AuthService {
    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:5000';
    }

    async Login(userInfo) {
        try {
            const urlAuth = `${this.baseURL}/api/auth`

            console.warn(urlAuth);

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
                    message: response.statusText
                };

            return {
                isSuccess: true,
                status: response.status,
                message: null,
                data: await response.json()
            };
        }
        catch (err) {
            return {
                isSuccess: false,
                status: 500,
                message: err.message,
                data: err
            }
        }

    }
}

export default AuthService;