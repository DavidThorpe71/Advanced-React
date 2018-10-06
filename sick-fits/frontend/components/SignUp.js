import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signUp(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;

class signup extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signUp, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await signUp();
              this.setState({
                name: '',
                email: '',
                password: ''
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up for an account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default signup;
