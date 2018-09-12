// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request');

var rp = require('request-promise-native')

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

const DATA_SOURCE_URLS = ['http://www.breizhcamp.org/json/talks.json', 'http://www.breizhcamp.org/json/others.json'];


// Version d'init avec la promesse
// Etape 1 => plus de callback
// Etape 2 => la méthode retourne une instance de promesse
exports.init1 = () => {

    // resolve => cas ok. permet de communiquer la valeur recherchée
    // reject => cas ko. permet de communiquer l'erreur
    return new Promise((resolve, reject) => {

        //resolve(120);

        // Envoie de la requête http
        request('http://www.breizhcamp.org/json/talks.json', {
            json: true
        }, (err, res, body) => {

            if (err) {
                reject(err)
            } else {
                talks = talks.concat(body)
                resolve(talks.length)
            }
        });


    });
}


exports.init2 = () => {

    const req1$ = rp('http://www.breizhcamp.org/json/talks.json', {
        json: true
    });
    const req2$ = rp('http://www.breizhcamp.org/json/others.json', {
        json: true
    });

    return Promise.all([req1$, req2$])
        .then(result => {
            result.forEach(r => {
                talks = talks.concat(r)
            });
            return talks.length;
        });
}

exports.init3 = () => {

    const reqs$ = DATA_SOURCE_URLS.map(url => rp(url, {
        json: true
    }));

    return Promise.all(reqs$)
        .then(result => {
            result.forEach(r => {
                talks = talks.concat(r)
            });
            return talks.length;
        });
}

















exports.oldInit = function (callback) {

    var respReq = 0;

    //function compteur verifie si les 2 requet ont bien était recus avant d'executer callback
    function compteur() {
        respReq++
        if (respReq === 2) {
            callback(talks.length);
        }
    }


    // Envoie de la requête http
    request('http://www.breizhcamp.org/json/talks.json', {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log('Erreur', err);
        }
        talks = talks.concat(body)
        compteur()
    });

    request('http://www.breizhcamp.org/json/others.json', {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log('Erreur', err);
        }
        talks = talks.concat(body)
        compteur()
    });


};
exports.listerSessions = function (callback) {
    return talks
}