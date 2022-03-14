/* eslint-disable @typescript-eslint/no-unused-expressions */
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

gql`
  query TokenSnapshots($address: String!) {
    tokenSnapshots(
      where: { token: $address }
      orderBy: timestamp
      orderDirection: desc
      first: 1000
    ) {
      token {
        id
        name
        symbol
      }
      timestamp
      numMembers
      totalSupply
    }
  }
`;
