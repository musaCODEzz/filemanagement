const axios = require("axios");
const controller = require('../controller/controller');


exports.loginRouter = (req, res) => {
    res.render("signin");
}


exports.homeRouter = (req, res) => {
    let token = req.query.token;


    // Make a get requests to /api/films
    axios.get("https://filmmanagement.herokuapp.com/api/films")
        .then(function (response) {

            // axios({
            //     method: 'get',
            //     url: `https://api.github.com/user`,
            //     headers: {
            //       Authorization: 'token ' + token
            //     }
            //   }).then((respond) => {
            //       console.log(respond.data);
            //     res.render('index', { user: respond.data, films: response.data });
            //   })
            res.render("index", {films: response.data});
        })
        .catch(err => {
            res.send(err);
        });
};

exports.add_film = (req, res) => {
    res.render("add_film");
};
exports.update_film = (req, res) => {

    axios.get('https://filmmanagement.herokuapp.com/films', { params: { id: req.query.id } })
        .then(function (filmdata) {
            //console.log(filmdata.data);
            // filmdata.data.forEach(element => {
            //     console.log(element._id + ' and req is ' + req.query.id);

            //     if(element._id == req.query.id){
            //         console.log(element);
            //     }
            // });
            res.render("update_film", { film: filmdata.data });

        })
        .catch(err => {
            res.send(err);
        })


}

exports.auth = (req, res) => {
    let code = req.query.code;

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=9f6031eccdab3d58bac7&client_secret=9befeaa3298850f27f17ca267bc99a51204cecae&code=${code}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        let access_token = response.data.access_token
        res.redirect(`/home?token=${access_token}`);
    })

    //console.log(req.body);
    //res.send('done');
}