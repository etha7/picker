import gql from 'graphql-tag';


export const resolvers = {
    Mutation: {
        incrementCount: (obj, args, {cache}) => {
            const query = gql`
              query RemovedCount{
                 removedCount @client
              }   
            `
            var test = cache.readQuery({query})
            var previous = test.removedCount
            var data = {removedCount: previous + 1}
            cache.writeQuery({query, data})
            return previous + 1
        }

        
    }



}