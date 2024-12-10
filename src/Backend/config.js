require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fe4744f2003d29b431b7e748a2e9bc8765fca93aa35fa8eca2a28a5f8afca18339d7dd5abec524eb8d70ebe55c3cd4212a693e80474cc798ab1559e7570d9368';

module.exports = { JWT_SECRET };
