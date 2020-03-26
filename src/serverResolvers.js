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
    },
    Mutation:{
        login: (_, args, { pool }) => {
            return pool.connect().then(client => {
                return client
                .query(`SELECT COUNT(username) FROM users WHERE username='${args.username}' AND password='${args.password}';`)
                .then(res => {
                    client.release()
                    return !(res.rows[0].count == '0')
                }) 
            })
        },
        createUser: (_, args, { pool }) => {
            console.log("createUser")
            return pool.connect().then( client => {
                return client
                .query(`INSERT INTO users(username, password) VALUES ('${args.username}', '${args.password}');`)
                .then( res => {
                    client.release()
                    return true
                })
                .catch(err =>{
                    console.log(err)
                    return false
                })
            })
        },
        
    }
}
