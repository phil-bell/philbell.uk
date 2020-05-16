db.createUser(
    {
        user: "phil",
        pwd: "pass",
        roles: [{
            role: 'readWrite',
            db: "db"
        }]
    }
)