import { cookies } from "next/headers";

export interface UserProfileTaskResponse {
    isSuccess: boolean;
    status: number;
    message: string;
    data: number | null;
}

export async function UserProfileCreateTasksAction(externalID : string) : Promise<UserProfileTaskResponse>{
    const cookiesStore = cookies();

    const token = cookiesStore.get("token");
    if(token?.value == undefined)
        return {
            isSuccess: false,
            data: null,
            message: "Token are invalid",
            status: 400
        };

    
}