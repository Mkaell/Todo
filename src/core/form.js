export class Form {
    constructor(form, items){
        this.form = form;
        this.items = items;
    }

    value(){
        const value = {};

        Object.keys(this.items).forEach((item) => {
            value[item] = this.form[item].value;
        });
        return value;
    }

    clear(){
        Object.keys(this.items).forEach((item) => {
            this.form[item].value = '';
        });
    }
}