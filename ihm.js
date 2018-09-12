var service = require('./service');
var readline = require('readline');
var lg = console.log;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function () {

    service.init(function (nb) {
        lg('*************************\n',
            '1. Rafraichir les données\n',
            '2. Lister les sessions\n',
            '99. Quitter\n')
        rl.question('Choix  ? : ', function (saisie) {
            switch (saisie) {
                case '1':
                    service.init(function (nb) {
                        lg('... Données mises à jour')
                    });

                    break;

                case '2':
                    service.listerSessions(nb).forEach(serv => console.log(serv.name, " (" + serv.speakers + ")\n"));;


                    break;

                case '99':
                    lg('Aurevoir !')

                    break;

                default:
                    lg("Erreur de saisie !");

            }

            rl.close(); // attention, une fois l'interface fermée, la saisie n'est plus possible


        });
    })
};