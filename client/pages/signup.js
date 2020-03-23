import React from "react";
import { withApollo } from "../apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

const SignUpMutation = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
    }
  }
`;

const signup = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [signUp, { loading }] = useMutation(SignUpMutation);

  const [state, setState] = React.useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMsg, setErrorMsg] = React.useState();

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    if (state.password !== state.confirmPassword){
      return setErrorMsg("passwords must match")
    }
    try {
      await client.resetStore();
      const { data } = await signUp({
        variables: {
          input: {
            email: state.email,
            password: state.password
          }
        }
      });

      if (data.signUp) {
        await router.push("/login");
      }
    } catch (error) {
      //setErrorMsg(getErrorMessage(error));
      setErrorMsg(error.graphQLErrors.map(x => x.message));
    } 
  };

  return (
    <>
      <Layout title="Sign Up">
        <form onSubmit={handleSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          <LoginForm
            state={state}
            handleChange={handleChange}
            loading={loading}
            signup={true}
          />
        </form>
      </Layout>
    </>
  );
};

export default withApollo(signup);
