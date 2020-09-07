import Container from '../components/Container'
import { gql, useQuery } from '@apollo/client'

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

export default function Home() {
  const { loading, error, data } = useQuery(SHOP_QUERY);

  return (
    <main>
      <Container>
        <h1>This is some text</h1>
      </Container>
    </main>
  )
}
