"use server";

import Loader from "@/components/loader";
import { Suspense } from "react";

export default async function UserProfile(props) {
  const { userInfo } = props;

  if (userInfo == null) return <h1>Error for load the userInfo</h1>;

  return (
    <div className="w-full h-60 border border-zinc-900 border-solid-1 rounded-lg px-8 py-5 flex justify-center bg-zinc-100">
      <div className="w-2/12">
        <div className="border border-solid border-black w-44 h-44 rounded-full bg-zinc-400"></div>
      </div>

      <div className="w-10/12 h-auto p-4 flex">
        <div className="w-3/12 h-auto block">
          <div className="text-3xl mb-2 text-zinc-700">{userInfo.name}</div>
          <div className="text-xl mb-2 text-zinc-900">{userInfo.email}</div>
        </div>
        <div className="w-3/12 h-auto block border-l-zinc-600 border-r-zinc-600 text-center">
            <div className="text-3xl mb-2 text-zinc-700">Tasks Created</div>
            <Suspense fallback={<Loader />}>
                <div className="text-xl mb-2 text-zinc-900">0</div>
            </Suspense>
        </div>
        <div className="w-3/12 h-auto block border-l-zinc-600 border-r-zinc-600 text-center">
            <div className="text-3xl mb-2 text-zinc-700">Performed By Me</div>
            <div className="text-xl mb-2 text-zinc-900">0</div>
        </div>
        <div className="w-3/12 h-auto block border-l-zinc-600 border-r-zinc-600 text-center">
            <div className="text-3xl mb-2 text-zinc-700">Completed Tasks</div>
            <div className="text-xl mb-2 text-zinc-900">0</div>
        </div>
      </div>
    </div>
  );
}
