import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import Navbar from '../components/Navbar';


/*
const tutorData = {
  science: [
    {
      topic: 'Topic',
      tutor: {
        name: 'Tutor',
        icon: 'https://loremflickr.com/256/256'
      },
      rating: 5,
      description: 'This is an example tutor bio.',
      availability: 'Mon-Fri',
    },
    {
      topic: 'AP Biology',
      tutor: {
        name: 'John Doe',
        icon: 'https://loremflickr.com/512/512'
      },
      rating: 5,
      description: 'A 5 scorer on the AP test!',
      availability: 'Fri-Sun',
    },
  ],
  math: [],
  english: [],
  history: [],
  other: [
    {
      topic: 'asdf',
      tutor: {
        name: 'bob',
        icon: 'https://loremflickr.com/512/512'
      },
      rating: 2,
      description: 'fun',
      availability: 'Fri-Sun',
    },
  ],
}
*/

export default function Explore() {
  const router = useRouter();

  const [subject, setSubject] = React.useState<string>('science');

  const [tutorData, setTutorData] = React.useState({
    science: [],
    math: [],
    english: [],
    history: [],
    other: [],
  });

  React.useEffect(() => {
    for(const subj of Object.keys(tutorData)) {
        fetchData(subj).then(data => {
          tutorData[subj] = data;
          setTutorData(tutorData);
        });
    }
  }, []);

  async function fetchData(subject) {
    console.log(subject);
    const res = await fetch(`/api/tutors/${subject}`);
    console.log(subject, res);
    const json = await res.json();
    return json;
  }

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
          <NextLink href={{
            pathname: '/explore',
            query: { subject: 'science' },
          }}>
            <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='science'?'font-semibold':'font-normal'}`}>
              Science
            </div>
          </NextLink>
          <NextLink href={{
            pathname: '/explore',
            query: { subject: 'math' },
          }}>
          <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='math'?'font-semibold':'font-normal'}`}>
            Math
          </div>
          </NextLink>
          <NextLink href={{
            pathname: '/explore',
            query: { subject: 'english' },
          }}>
            <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='english'?'font-semibold':'font-normal'}`}>
              English
            </div>
          </NextLink>
          <NextLink href={{
            pathname: '/explore',
            query: { subject: 'history' },
          }}>
            <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='history'?'font-semibold':'font-normal'}`}>
              History
            </div>
          </NextLink>
          <NextLink href={{
            pathname: '/explore',
            query: { subject: 'other' },
          }}>
            <div className={`flex-initial p-2 cursor-pointer hover:underline ${subject==='other'?'font-semibold':'font-normal'}`}>
              Other
            </div>
          </NextLink>
        </div>

        <div className="py-6 mt-2">
          <h2 className="text-2xl font-semibold">{subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>

          <div className="grid gap-3 grid-cols-4 mt-4">
            {tutorData[subject].map(t =>
              <div className="py-4 px-6 rounded-lg bg-slate-100">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-auto">
                    <h3 className="text-lg font-semibold leading-6">{t.topic}</h3>
                    <p className="text-md">{t.tutor.name}</p>
                    <p className="text-sm text-slate-500">⭐️ {t.rating.toFixed(1)}</p>
                  </div>
                  <div className="flex-auto flex justify-end">
                    <img className="h-14 w-14 rounded-full" src={t.tutor.icon} alt="John Doe"/>
                  </div>
                </div>
                <p className="text-sm mt-2">{t.description}</p>
                <p className="text-xs text-slate-600 mt-1">Available {t.availability}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>

    <footer>
    </footer>
  </>;
}