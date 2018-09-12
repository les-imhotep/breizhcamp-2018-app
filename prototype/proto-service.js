var Service = require('../service')

// technique de la callback
//service.oldInit(nb => console.log('[init]', nb, 'sessions trouvées.'));

const service = new Service();

// équivalent en promesse
const result$ = service.init();

result$
    // cas de la promesse résolue (résultat ok)
    .then(nb => console.log('[init]', nb, 'sessions trouvées.'))
    // cas de la promesse éjectée (résultat ko)
    .catch(err => console.log('Erreur', err));