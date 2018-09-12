var readline = require('readline');
var lg = console.log;
var saisie = 0;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
lg('*************************\n',
    '1. Rafraichir les données\n',
    '2. Lister les sessions\n',
    '99. Quitter\n')
rl.question('Choix  ? : ', function (saisie) {
    switch (saisie) {
        case '1':
            break;
        case '2':
            break;
        case '99':
            lg('Aurevoir !')
            rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
            break;
    }




});





