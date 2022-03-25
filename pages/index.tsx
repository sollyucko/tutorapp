import Head from 'next/head';
import React from 'react';

import Navbar from '../components/Navbar';

export default function Home() {
  return <>
    <Head>
      <title>tutorapp</title>
      <meta name="description" content="by @linkai101 on github" />
    </Head>

    <Navbar className="container flex px-4 py-4"/>

    <main>
      <div className="h-96 bg-blue-200 flex items-center justify-center">
        <h2 className="text-4xl font-semibold text-blue-500 underline decoration-4 decoration-blue-600">
          insert motto here.
        </h2>
      </div>
    </main>

    <footer>
    </footer>
  </>;
}
