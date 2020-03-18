import React from "react";
import { useRouter } from "next/router";
import { withApollo } from "../apollo/client";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

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
  const { data, loading } = useQuery(ViewerQuery, {fetchPolicy:'no-cache'});
  
  console.log("data", data);
  // console.log(loading);
  if (!loading && data.viewer === null && typeof window !== 'undefined') {
    router.push("/login");
  }

  if (data && data.viewer) {
    return (
      <div>
        You're signed in as {data.viewer.email} goto{" "}
        <Link href="/about">
          <a>static</a>
        </Link>{" "}
        page. or{" "}
        <Link href="/signout">
          <a>signout</a>
        </Link>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default withApollo(Home);
