"use server";

import AuthorizationService from "@/services/authorizationService";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserInfo } from "os";
import { BaseResponse } from "@/domain/interfaces/commomInterfaces";

export async function sendLogin(data: UserInfo): Promise<BaseResponse> {
  console.log(data);
  const authService = new AuthorizationService();
  const cookieStore = cookies();

  const { email, password } = data;

  if (email.length == 0)
    return {
      isSuccess: false,
      status: 400,
      message: "Email is required",
    };

  if (password.length == 0)
    return {
      isSuccess: false,
      status: 400,
      message: "Password is required",
    };

  var authResponse = await authService.Login(data);
  if (authResponse.isSuccess) {
    console.log(authResponse.data);

    cookieStore.set("token", authResponse.data?.token);
    cookieStore.set("user", JSON.stringify(authResponse.data?.user));

    console.log(cookieStore.get("token"));
    return {
      isSuccess: true,
      status: 200,
      message: null,
    };
  } else
    return {
      isSuccess: false,
      status: authResponse.status,
      message: authResponse.message,
    };
}
