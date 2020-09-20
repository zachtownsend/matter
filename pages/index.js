import { Component } from 'react';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import Page from '../components/Page';
import StoryblokService from '../lib/storyblok-service';

// export default function Home({ page }) {
//     // const { loading, error, data } = useQuery(SHOP_QUERY);
//     console.log('page:', page);
//     const [pageContent, setPageContent] = useState(page.story.content);
//     // StoryblokService.get('cdn/stories/test/test-page').then((res) => {
//     //     console.log(res);
//     // });

//     useEffect(() => {
//         StoryblokService.initEditor(this);
//     }, []);

//     return (
//         <main>
//             <Container>
//                 <Page body={pageContent.body}></Page>
//             </Container>
//         </main>
//     );
// }

export default class Home extends Component {
    constructor(props) {
        super(props);
        const { page } = props;
        this.state = {
            pageContent: page.story.content
        };
    }

    componentDidMount() {
        StoryblokService.initEditor(this);
    }

    render() {
        const { pageContent } = this.state;

        return (
            <main>
                <Container>
                    <Page body={pageContent.body}></Page>
                </Container>
            </main>
        );
    }
}

export async function getStaticProps({ query }) {
    // StoryblokService.setQuery(query);
    const { data } = await StoryblokService.get('cdn/stories/test/test-page');
    return { props: { page: data } };
}
