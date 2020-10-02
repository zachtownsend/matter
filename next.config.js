const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
    [
        [
            optimizedImages,
            {
                optimizeImagesInDev: true,
                mozjpeg: {
                    quality: 80
                }
            }
        ]
    ],
    {
        webpack: (config) => {
            config.module.rules.push({
                test: require.resolve('./data/globalData.js'),
                use: [{ loader: 'val-loader' }]
            });
            return config;
        }
    }
);
