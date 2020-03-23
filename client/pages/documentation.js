import React from 'react'
import Layout from '../components/Layout'
import { useQuery, useApolloClient } from "@apollo/client";
import { withApollo } from '../apollo/client';
import {ViewerQuery} from '../src/queries'


const documentation = () => {
  const client = useApolloClient();
  try {
    const { data, loading } = useQuery(ViewerQuery);
    // client.resetStore()
    return (
      <Layout title='Documentation'>
        <p>{data.viewer.email}</p>
      </Layout>
    )
  } catch (error) {
    console.log(error)
    return (
      <Layout title='Documentation'>
        <p>no cache</p>
      </Layout>
    )

  }


  
  
  
}

export default withApollo(documentation)
