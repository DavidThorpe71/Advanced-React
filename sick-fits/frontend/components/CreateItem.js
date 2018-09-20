import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;


class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }


  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            // call the mutation
            const res = await createItem();
            // send them to the single item page
            console.log(res)
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="description">
                Description
            <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button>Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION }