export default (req, res) => {
    console.log({ req, res });
    res.status(200).send(`Test!`);
};
