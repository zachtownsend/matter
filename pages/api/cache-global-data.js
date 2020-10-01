const fs = require('fs');
import StoryblokService from '../../lib/storyblok-service';

export default async (req, res) => {
    const { data } = await StoryblokService.get('cdn/stories', { cv: Date.now() });
    const { stories } = data;
    const component = stories.find((story) => (story.id === req.body.story_id ? story : false));

    switch (component.slug) {
        case 'global':
            var globalData = JSON.stringify(component.content);
            await fs.writeFileSync('data/global.json', globalData);
            break;
    }

    res.status(200).send('caching!');
};
