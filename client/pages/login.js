import React from "react";
import { withApollo } from "../apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
//import { getErrorMessage } from "../lib/form";
import LoginForm from "../components/LoginForm";
import Layout from '../components/Layout'

const SignInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      email
    }
  }
`;

const login = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [signIn, {loading}] = useMutation(SignInMutation);

  const [state, setState] = React.useState({
    email: "moreira.christophe@gmail.com",
    password: "a21140108"
  });

  const [errorMsg, setErrorMsg] = React.useState();

  
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          input: {
            ...state
          }
        }
      });
      
      if (data.signIn) {
        // client.writeData({data:{AAA:data.signIn}})
        await router.push("/");
      }
    } catch (error) {
      //setErrorMsg(getErrorMessage(error));
      setErrorMsg(error.graphQLErrors.map(x => x.message));
      
    }
  };
  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });


  return (
    <>
    <Layout title="Login"/>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <LoginForm state={state} handleChange={handleChange} loading={loading} />
      </form>
    </>
  );
};

export default withApollo(login);
