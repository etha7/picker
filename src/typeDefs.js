
export const typeDefs = `
   type Query{
     name
   }
`

export const localTypeDefs = `
  type Query {
    removedCount
    rating(
      businessKey: Int!
    )
    loggedIn(
      username: String!
    )
    loginStates
  }

  type Mutation {
    incrementCount
    setRating(
      businessKey: Int!
    ) 
    setLoggedIn(
      username: String!,
      loggedIn: Boolean!
    )
  }

`;