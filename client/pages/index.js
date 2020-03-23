import React from "react";
import { useRouter } from "next/router";
import { withApollo } from "../apollo/client";
import { useQuery } from "@apollo/client";
import {ViewerQuery} from '../src/queries'
import Link from "next/link";
import Layout from "../components/Layout";



const Home = () => {
  const router = useRouter();
 
  const { data, loading } = useQuery(ViewerQuery, {fetchPolicy:'network-only'});

  
  // console.log("data", data);
 
  if (!loading && data.viewer === null && typeof window !== 'undefined') {
    router.push("/login");
  }
// console.log(client.cache.data)
  if (data && data.viewer) {
    return (
      <Layout title="Home" loggedIn={!!data.viewer}>
        You're signed in as {data.viewer.email} goto{" "}
        <Link href="/about">
          <a>static</a>
        </Link>{" "}
        page. or{" "}
        <Link href="/signout">
          <a>signout</a>
        </Link>
      </Layout>
    );
  }

  return <p>Loading...</p>;
};



export default withApollo(Home);
