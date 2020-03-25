exports.resolvers = {
    Query:{
        name: (obj, args, { pool })=>{
            return pool.connect().then(client => {
                return client
                .query("SELECT * FROM users")
                .then(res => {
                    client.release()
                    return res.rows[0].username
                })
                .catch(err => {
                    client.release()
                    console.log(err)
                })
           });
        }
    }
}