export interface UserInfo {
    email: string;
    password: string;
}

export interface UserBaseResponse{
    isSuccess: boolean;
    message: string | null,
    status: number,
    data: UserResponse | null
}

export interface UserResponse {
    token: string | null;
    user: UserDataResponse | null
}

export interface GetUserResponse{
    isSuccess: boolean;
    message: string | null,
    status: number,
    data: UserDataResponse | null
}

export interface UserDataResponse {
    email: string;
    name: string;
    id: string;
    roles: string[];
    enterprises: string[];
}