import Link from "next/link";
import { Suspense } from "react";

import Loader from "@/components/Loader/Loader";

export default function GeneralLayout({ children }) {
  return (
    <section className="bg-gradient-to-b from-white to-gray-300 h-screen text-black">
      <aside id="default-menu" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 ovewflow-y-auto bg-green-400 dark:bg-green-700">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href='/Dashboards'
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-green-900 dark:hover:bg-green-300 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboards</span>
              </Link>
            </li>
            <li>
              <Link href='/Dashboards/Task/CreateTask'
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-green-900 dark:hover:bg-green-300 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Create new Task</span>
              </Link>
            </li>
            <li>
              <Link href='/Dashboards/Profile'
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-green-900 dark:hover:bg-green-300 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4">
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
