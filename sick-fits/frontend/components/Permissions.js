import { Query, Mutation } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMDELETE',
  'ITEMUPDATE',
  'PERMISSIONUPDATE'
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      email
      name
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, error }) => (
      <div>
        <Error error={error} />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => (
                <th key={permission}>{permission}</th>
              ))}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserPermissions key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
        <p>Hey!</p>
      </div>
    )}
  </Query>
);

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };

  state = {
    permissions: this.props.user.permissions
  };

  handlePermissionChange = (e, updatePermissions) => {
    const checkBox = e.target;

    const { permissions } = this.state;
    let updatedPermissions = [...permissions];
    // figure out if we need to remiove or add this permission
    if (checkBox.checked) {
      updatedPermissions.push(checkBox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkBox.value
      );
    }
    this.setState({
      permissions: updatedPermissions
    });
    updatePermissions();
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions,
          userId: user.id
        }}
      >
        {(updatePermsissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={e => this.handlePermissionChange(e, updatePermsissions)
                      }
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermsissions}
                >
                  Updat
                  {loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
