import Store from '../store'
export default class CustomError extends Error {

    constructor(code, message, ...restParams) {
        
        super(message);
        
        this.message = message;
        this.code = code;
        this.date = new Date();
        
        this.saveError();
        this.dispatchError();

    }

    dispatchError() {
        Store.dispatch('notification/add', { code: this.code, type: 'danger', message: this.message, id: this.id });
    }

    async saveError() {
        console.log('Enregistre l\'erreur dans la table des logs');
    }

    formatDate() {
        return `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`;
    }

}