import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $id: ID!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {id: $id}}}) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      id: req.body.id,
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
