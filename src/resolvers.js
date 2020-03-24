import gql from 'graphql-tag';
const GET_RATINGS = gql`
               query Ratings{
                   ratings @client
               }
            `

export const resolvers = {
    Query: {
        rating: (obj, args, {cache}) => {
            const query = GET_RATINGS
            var ratings = cache.readQuery({query})
            if(ratings[args.businessKey] === undefined) return 0 
            return ratings[args.businessKey]
        }
    },
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
        },

        setRating: (obj, args, {cache, getCacheKey}) => {
            const query = gql`
               query Rating($businessKey){
                   rating @client
               }
            `
            var rating = cache.readQuery({query}).rating;
            var data = {rating}
            cache.writeQuery({query, data})
            return rating 


        }

        
    }



}