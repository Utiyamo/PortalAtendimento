"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import UserService from "@/services/userService";

export default async function Profile() {
  const cookieStore = cookies();
  const userService = new UserService();

  const token = cookieStore.get("token");
  if (token == undefined) return redirect("/Login");

  const userString = cookieStore.get("user");
  if (userString?.value == undefined) return redirect("/Login");
  else if (userString?.value.trim().length == 0) return redirect("/Login");

  const userJson = JSON.parse(userString?.value);

  var response = await userService.getUser(userJson.id, token?.value);
  if (response.isSuccess) {
    return (
      <>
        <h1>Profile</h1>
        <pre>{response.data.name}</pre>
      </>
    );
  } 
  else 
    redirect("/Login");
}
