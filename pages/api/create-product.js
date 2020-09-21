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
                        '22a4c18b944f1ef5794c2db5e70157424d9ae6d78ee5b6007bdb2b0d549a4a85'
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
    const productData = await verifyWebhook(req);
    if (!productData) {
        res.status(401).send('Webhook unverified');
    }
    const options = {
        method: 'POST',
        url: 'https://mapi.storyblok.com/v1/spaces/93371/stories/',
        headers: {
            'content-type': 'application/json',
            authorization: 'J5463PpgAwcqaam3OhCUWQtt-72710-FtuvwyJ9q5z-x11MwBjf'
        },
        data: { story: { name: productData.title, slug: productData.handle } }
    };

    await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.status(200).send('it worked!');
        })
        .catch(function (error) {
            console.error(error);
            res.status(422).send(error.message);
        });
};
