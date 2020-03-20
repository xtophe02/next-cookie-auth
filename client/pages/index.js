import React from "react";
import { useRouter } from "next/router";
import { withApollo } from "../apollo/client";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import Layout from "../components/Layout";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;
const Home = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { data, loading } = useQuery(ViewerQuery, {fetchPolicy:'no-cache'});
  
  console.log("data", data);
  // console.log(loading);
  if (!loading && data.viewer === null && typeof window !== 'undefined') {
    router.push("/login");
  }
console.log(client.cache.data)
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
