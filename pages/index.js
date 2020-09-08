import Container from '../components/Container'
import { gql, useQuery } from '@apollo/client'
import client from '../lib/apollo';

const SHOP_QUERY = gql`
  query {
    shop {
      name
      primaryDomain {
        url
        host
      }
    }
  }
`;

export default function Home(test) {
  // const { loading, error, data } = useQuery(SHOP_QUERY);
  console.log(test);
  return (
    <main>
      <Container>
        <h1>This is some text</h1>
      </Container>
    </main>
  )
}

export async function getStaticProps() {
  const data = await client.query({
      query: SHOP_QUERY
  });

  return { props: data };
}
