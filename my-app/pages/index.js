import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Login from './login'

function Home() {
  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <h1>Simplest Login System</h1> */}

      {/* <h2>Proudly using Next.js, Mongodb and deployed with Now</h2> */}
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <Button
            onClick={() => {
              cookie.remove('token');
              revalidate();
            }}>
            Logout
          </Button>
        </>
      )}
      {!loggedIn && (
        <>
          {/* <Link href="/login">Login</Link>
          <p>or</p>
          <Link href="/signup">Sign Up</Link> */}
          <Login></Login>
        </>
      )}
    </div>
  );
}

export default Home;