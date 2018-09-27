import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { perPage } from '../config';
import Link from 'next/link';
import Head from 'next/head';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;


const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const { page } = props;
        return (
          <PaginationStyles>
            <Head>
              <title>Sick Fits | Page {page} of {pages}</title>
            </Head>
            <Link href={{
              pathname: 'items',
              query: { page: page - 1 }
            }}>
              <a>👈 Prev</a>
            </Link>
            <p>Page {page} of {pages}!</p>
          </PaginationStyles>
        )
      }}

    </Query>
  );
}

export default Pagination;