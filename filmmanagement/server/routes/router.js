const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description:Root route
 * @method: GET/
 */

route.get('/', services.loginRouter);

route.get('/login/github/callback', services.auth);

route.get('/home', services.homeRouter);
   
/**
 * @description:add films
 * @method: GET/add-film
 */

route.get('/add-films', services.add_film);


/**
 * @description:update films
 * @method: GET/update-film
 */

route.get('/update-film', services.update_film);


//API
route.post('/api/films', controller.create);
route.get('/api/films', controller.find);
route.put('/api/films/:id', controller.update);
route.delete('/api/films/:id', controller.delete);
route.get('/api/films/delete', controller.delete);
route.get('/update-films', controller.update);

route.get('/test', (req,res)=>{
    res.send('test called');
})

module.exports = route;