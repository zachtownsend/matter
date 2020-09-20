import Axios from 'axios';

import axios from 'axios';

export default (req, res) => {
    console.log({ req, res });
    const { body } = req;
    axios({
        method: 'post',
        url: 'https://mapi.storyblok.com/v1/spaces/93371/stories/',
        data: {
            story: {
                name: body.title,
                slug: body.handle
            }
        },
        headers: {
            Authorization: 'J5463PpgAwcqaam3OhCUWQtt-72710-FtuvwyJ9q5z-x11MwBjf',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response);
            res.status(200).send('it worked!');
        })
        .catch((error) => {
            res.status(200).send(error.message);
        });
};
