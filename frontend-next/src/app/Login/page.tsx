"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/domain/interfaces/userInterfaces";
import { BaseResponse } from "@/domain/interfaces/commomInterfaces";
import { sendLogin } from "./action";
import { useState } from "react";
import { useRouter } from "next/navigation";

type UserInputEvent = React.ChangeEvent<HTMLInputElement>;

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState<UserInfo>({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUser = (e: UserInputEvent) => {
    let updatableUser: UserInfo = { ...user };
    updatableUser[e.target.name as keyof UserInfo] = e.target.value;
    setUser(updatableUser);
  };

  const buttonAction =  () => {
    setErrorMessage('');

    var result = sendLogin(user)
      .then((response: BaseResponse) => {
        if(response.isSuccess)
          router.push("/Internal/Profile");
        else{
          setErrorMessage(response.message);
        }
      });
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Crawler</h1>
      <form id="formLogin" noValidate>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            className="text-black dark:text-white"
            onChange={handleUser}
          />
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <Input
            type="password"
            placeholder="password"
            name="password"
            className="text-black dark:text-white"
            onChange={handleUser} 
          />
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <Button variant="secondary" type="button" onClick={buttonAction}>Log in</Button>
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          {errorMessage.length > 0 && <Label className="text-red-600 font-medium">{errorMessage}</Label>}
        </div>
      </form>
    </>
  );
}
