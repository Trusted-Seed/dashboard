/* eslint-disable no-unused-expressions */
import gql from 'graphql-tag';

gql`
  query TokenInfo($address: ID!) {
    token(id: $address) {
      id
      name
      symbol
      numMembers
      totalSupply
    }
  }
`;
