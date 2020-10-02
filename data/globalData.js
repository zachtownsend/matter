const StoryblokClient = require('storyblok-js-client');

module.exports = async () => {
    const storyblokClient = new StoryblokClient({
        accessToken: 'WTkMiDnBNZL3j1ziC8F87wtt',
        cache: {
            clear: 'auto',
            type: 'memory'
        }
    });
    const { data } = await storyblokClient.get('cdn/stories/global', { cv: Date.now() });
    return {
        code: `module.exports = ${JSON.stringify(data.story.content)}`
    };
};
