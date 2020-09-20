import Axios from 'axios';

import axios from 'axios';

export default (req, res) => {
    const { body } = req;
    const options = {
        method: 'POST',
        url: 'https://mapi.storyblok.com/v1/spaces/93371/stories/',
        headers: {
            'content-type': 'application/json',
            authorization: 'J5463PpgAwcqaam3OhCUWQtt-72710-FtuvwyJ9q5z-x11MwBjf'
        },
        data: { story: { name: body.title, slug: body.handle } }
    };
    axios
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
