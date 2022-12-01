const express = require('express');
const schema = require('./src/schema/schema')
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(6060, () => {
  console.log('server listening on port 6060');
});