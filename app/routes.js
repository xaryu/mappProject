var mongoose        = require('mongoose');
var User            = require('./model.js');

module.exports = function(app) {

    app.get('/users', function(req, res){

        var query = User.find({});
        query.exec(function(err, users){
            if(err) {
                res.send(err);
            } else {
                res.json(users);
            }
        });
    });

    app.post('/users', function(req, res){
        var newuser = new User(req.body);
        newuser.save(function(err){
            if(err)
                res.send(err);
            else
                res.json(req.body);
        });
    });

    // Return json records
    app.post('/query/', function(req, res){

        // Grab all query params
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var male            = req.body.male;
        var female          = req.body.female;
        var other           = req.body.other;
        var minAge          = req.body.minAge;
        var maxAge          = req.body.maxAge;
        var favLang         = req.body.favlang;
        var reqVerified     = req.body.reqVerified;

        var query = User.find({});

        if(distance){
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},
                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});

        }

        // gender filter
        if(male || female || other){
            query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
        }

        // min age filter
        if(minAge){
            query = query.where('age').gte(minAge);
        }

        // max age filter
        if(maxAge){
            query = query.where('age').lte(maxAge);
        }

        // favorite Language filter
        if(favLang){
            query = query.where('favlang').equals(favLang);
        }

        // html5 verified location filter
        if(reqVerified){
            query = query.where('htmlverified').equals("Verified");
        }

        query.exec(function(err, users){
            if(err)
                res.send(err);
            else
                res.json(users);
        });
    });

    app.delete('/users/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        User.findByIdAndRemove(objID, update, function(err, user){
            if(err)
                res.send(err);
            else
                res.json(req.body);
        });
    });
};
