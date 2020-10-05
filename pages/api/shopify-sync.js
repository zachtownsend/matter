const fs = require('fs');
import axios from 'axios';
import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: false
    }
};

async function verifyWebhook(req) {
    const hmac = req.headers['x-shopify-hmac-sha256'];
    const bodyChunks = [];
    return new Promise((resolve, reject) => {
        req.on('data', (chunk) => bodyChunks.push(chunk)).on('end', async () => {
            const rawBody = Buffer.concat(bodyChunks).toString('utf-8');

            try {
                const hash = crypto
                    .createHmac(
                        'SHA256',
                        '22a4c18b944f1ef5794c2db5e70157424d9ae6d78ee5b6007bdb2b0d549a4a85' // TODO: replace with env variables
                    )
                    .update(rawBody, 'utf8')
                    .digest('base64');
                resolve(hash === hmac ? JSON.parse(rawBody) : false);
            } catch (error) {
                console.error(error.message);
                reject(error.message);
            }
        });
    });
}

export default async (req, res) => {
    const webhookData = await verifyWebhook(req);
    if (!webhookData) {
        res.status(401).send('Webhook unverified');
    }

    const options = {
        headers: {
            'content-type': 'application/json',
            authorization: 'J5463PpgAwcqaam3OhCUWQtt-72710-FtuvwyJ9q5z-x11MwBjf' // TODO: replace with env variables
        }
    };

    const data = {
        name: webhookData.title,
        slug: webhookData.handle
    };

    fs.readFileSync('./sync.json');

    let syncData = JSON.parse(fs.readFileSync('./sync.json')); // TODO: load existing syncData first
    const webhookType = req.headers['x-shopify-topic'].split('/').pop();

    switch (req.headers['x-shopify-topic']) {
        case 'products/create':
            options.method = 'POST';
            options.url = 'https://mapi.storyblok.com/v1/spaces/93371/stories/';
            data.parent_id = 21495007; // TODO: replace with env variable
            data.content = {
                component: 'product',
                body: [],
                _uid: `${webhookData.id}`
            };
            data.meta_data = {
                shopify_id: webhookData.id
            };

            break;
        case 'products/delete':
            try {
                const storyId = syncData[webhookData.id];
                options.method = 'DELETE';
                options.url = `https://mapi.storyblok.com/v1/spaces/93371/stories/${storyId}`;
                delete syncData[webhookData.id];
            } catch (error) {
                console.log(error);
            }
            break;
        case 'collections/create':
            options.method = 'POST';
            options.url = 'https://mapi.storyblok.com/v1/spaces/93371/stories/';
            data.parent_id = 22728484; // TODO: replace with env variable
            data.content = {
                component: 'collection',
                body: []
            };
            data.meta_data = {
                shopify_id: webhookData.id
            };
            break;
    }

    options.data = {
        story: data
    };

    try {
        const response = await axios.request(options);

        if (webhookType === 'create') {
            syncData[webhookData.id] = response.data.story.id;
        }

        fs.writeFileSync('./sync.json', JSON.stringify(syncData));
        res.status(200).send('it worked!');
    } catch (error) {
        console.error(error);
        res.status(422).send(error.message);
    }
};
