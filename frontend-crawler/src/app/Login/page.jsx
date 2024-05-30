'use client'

import { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import AuthService from "@/modules/services/authService";
import { redirect } from "next/dist/server/api-utils";
import { useDispatch } from "react-redux";
import { login } from "@/lib/reducers/userReducer";

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const _authService = new AuthService();
  const _router = useRouter();
  const _dispatch = useDispatch();

  const handleUser = (e) => {
    let updatableUser = user;
    updatableUser[e.target.name] = e.target.value;

    setUser(updatableUser);
  }

  const signUp = async () => {
    setErrorMessage('');

    let { email, password } = user;

    if (email.length == 0) {
      setErrorMessage("Email or Password are invalids");
      return;
    }

    if (password.length == 0) {
      setErrorMessage("Email or Password are invalids");
      return;
    }

    const resultAuth = await _authService.Login(user);
    if (resultAuth.isSuccess) {
      console.log(resultAuth);

      const { user, token } = resultAuth.data;
      _dispatch(login({ user, token}));
      _router.push('/Dashboards', { scroll: false });
    }
    else {
      console.warn(resultAuth);
      setErrorMessage(resultAuth.message);

    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Crawler</h1>
      <form id="formLogin" noValidate>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <label className="mr-4">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            className="pt-3 pb-2 block w-7/12 px-0 mt-0 bg-transparent text-black border-0 border-b-2 appearence-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            onChange={handleUser}
          />
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <label className="mr-4">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="pt-3 pb-2 block w-7/12 px-0 mt-0 bg-transparent text-black border-0 border-b-2 appearence-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            onChange={handleUser}
          />
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <button className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={signUp}>Log in</button>
        </div>
        <div className="relative z-0 w-full mb-5 flex flex-1 justify-around items-center">
          <span className="text-red-500 font-bold text-xl">{errorMessage}</span>
        </div>
      </form>
    </>
  );
}
