import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync('sQ7wB&%7c',10),
        isAdmin: true,
    },
    {
        name: "jose",
        email: "jose@example.com",
        password: bcrypt.hashSync('secure1010',10),
    },
    {
        name: "baseballbat",
        email: "yea@example.com",
        password: bcrypt.hashSync('secureme',10),
    }
]

export default users;

