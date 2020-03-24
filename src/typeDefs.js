import gql from 'graphql-tag';

export const typeDefs = `
  type Query {
    removedCount
    rating(
      businessKey: Int!
    )
  }

  type Mutation {
    incrementCount
    setRating(
      businessKey: Int!
    ) 
  }

`;