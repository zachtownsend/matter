import { Component } from 'react';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import Page from '../components/Page';
import StoryblokService from '../lib/storyblok-service';

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

export async function getStaticProps(test) {
    // StoryblokService.setQuery(query);
    console.log(test);
    const { data } = await StoryblokService.get('cdn/stories/home');
    return { props: { page: data } };
}
