import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';

export default function Explore() {
  const router = useRouter();

  const [subject, setSubject] = React.useState('science');

  React.useEffect(() => {
    checkQuery();
  }, [router]);

  function checkQuery() {
    if (router.query?.subject) {
      const subjects = ['science', 'math', 'english', 'history', 'other'];
      if (!subjects.includes(router.query.subject)) {
        //return router.push('/', undefined, { shallow: true });
      }
      setSubject(router.query.subject);
    }
  }

  return <>
    <Head>
      <title>Explore — tutorapp</title>
      <meta name="description" content="by @linkai101 on github" />
    </Head>

    <Navbar className="container flex px-4 py-4"/>

    <main>
      <div className="h-40 bg-blue-50 flex items-center justify-center">
        <h2 className="text-4xl font-semibold text-blue-900">
          Explore
        </h2>
      </div>

      <div className="container px-4 py-6">
        <div className="flex overflow-hidden rounded-lg bg-blue-100">
          <div className="flex-initial py-2 px-3 mr-2 font-semibold bg-blue-500 text-white">
            Browse subject:
          </div>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='science'?'font-semibold':'font-normal'}`}>
            Science
          </div>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='math'?'font-semibold':'font-normal'}`}>
            Math
          </div>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='english'?'font-semibold':'font-normal'}`}>
            English
          </div>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='history'?'font-semibold':'font-normal'}`}>
            History
          </div>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='other'?'font-semibold':'font-normal'}`}>
            Other
          </div>
        </div>

        <div className="py-6 mt-2">
          <h2 className="text-2xl font-semibold">Science</h2>

          <div className="grid gap-3 grid-cols-4 mt-4">
            <div className="py-4 px-6 rounded-lg bg-green-100">
              <div className="flex">
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-6">Topic <span className="font-normal">- Tutor</span></h3>
                  <p className="text-sm text-slate-500">⭐️ 5.0</p>
                </div>
                <div className="flex-auto flex justify-end">
                  <img className="h-14 w-14 rounded-full" src="https://loremflickr.com/256/256" alt="Example"/>
                </div>
              </div>
              <p className="text-sm mt-2">This is an example tutor bio.</p>
              <p className="text-xs text-slate-600 mt-1">Available Mon-Fri</p>
            </div>

            <div className="py-4 px-6 rounded-lg bg-green-100">
              <div className="flex">
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-6">AP Biology</h3>
                  <p className="text-md">John Doe</p>
                  <p className="text-sm text-slate-500">⭐️ 4.9</p>
                </div>
                <div className="flex-auto flex justify-end">
                  <img className="h-14 w-14 rounded-full" src="https://loremflickr.com/512/512" alt="John Doe"/>
                </div>
              </div>
              <p className="text-sm mt-2">A 5 scorer on the AP test!</p>
              <p className="text-xs text-slate-600 mt-1">Available Mon-Fri</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
    </footer>
  </>;
}
