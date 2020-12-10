import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync('sQ7wB&%7c',10),
        isAdmin: true,
    },
    {
        name: "Nigga balls",
        email: "niggaballs@example.com",
        password: bcrypt.hashSync('niggersnigga7with',10),
    },
    {
        name: "Nigga balls HD",
        email: "niggaballshd@example.com",
        password: bcrypt.hashSync('newsinglewedsayniggaballshd6738',10),
    }
]

export default users;