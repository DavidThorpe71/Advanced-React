import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
mutation SIGNOUT_MUTATION {
  signOut {
    message
  }
}
`;

const SignOut = (props) => {
  return (
    <Mutation
      mutation={SIGNOUT_MUTATION}
      refetchQueries={[
        { query: CURRENT_USER_QUERY }
      ]}
    >
      {signOut => (
        <button onClick={signOut}>Sign out</button>
      )}
    </Mutation>
  );
};

export default SignOut;