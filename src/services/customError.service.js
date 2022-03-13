import Store from '../store'
export default class CustomError extends Error {

    constructor(code, message, ...restParams) {
        
        super(message);
        
        this.message = message;
        this.code = code;
        this.date = new Date();
        this.id = this.generateRandomId();
        
        this.saveError();
        this.dispatchError();

    }

    dispatchError() {
        
        console.log('Enregistre l\'erreur dans le store et en session');
        Store.dispatch('notification/add', { code: this.code, type: 'danger', message: this.message, id: this.id });
    }

    async saveError() {
        console.log('Enregistre l\'erreur dans la table des logs');
    }

    formatDate() {
        return `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`;
    }

    generateRandomId() {
        // TODO Gérer l'unicité de l'id en recupérant les errors dans le store pour vérifirer que l'id n'existe pas
        return Math.floor(Math.random() * 5);
    }
}