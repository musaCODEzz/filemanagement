var Userdb = require('../model/model');
// create and save new user

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const film = new Userdb({
        name: req.body.name,
        yearOfRelease: req.body.yearOfRelease,
        genre: req.body.genre,
        status: req.body.status
    })

    // save film in the database
    film
        .save(film)
        .then(data => {
            //res.send(data)
            //res.redirect('/add-films');
            res.redirect('/home');

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}


// retrive and return films from database

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found film with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving film with id " + id })
            })

    } else {
        Userdb.find()
            .then(film => {
                res.send(film)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving film information" })
            })
    }

}



//update a new identified film
exports.update = (req, res) => {
    if (!req.query) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    console.log(req.query);
    const id = req.query.id;
    Userdb.findOneAndUpdate({_id: id}, {
        name: req.query.name,
        yearOfRelease: req.query.yearOfRelease,
        genre: req.query.genre,
        status: req.query.status

    }).then(data=>{
        if (!data) {
            res.status(404).send({ message: `Cannot Update film with ${id}. Maybe film not found!` })
        } else {
            //res.send(data)
            res.redirect('/home');
        }

    }) .catch(err => {
        res.status(500).send({ message: "Error Update film information" })
    })

    

    // Userdb.findByIdAndUpdate(id,
    //     {
    //         name: req.query.name,
    //         yearOfRelease: req.query.yearOfRelease,
    //         genre: req.query.genre,
    //         status: req.query.status
    //     },
    //     { useFindAndModify: false })

    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({ message: `Cannot Update film with ${id}. Maybe film not found!` })
    //         } else {
    //             res.send(data)
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: "Error Update film information" })
    //     })
}


//delete a film using id
exports.delete = (req, res) => {
    const id = req.query.id;


    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.redirect('/home')
                // res.send({
                //     message: "Film was deleted successfully!"
                // })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Film with id=" + id
            });
        });
}