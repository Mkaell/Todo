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

    isValid(){
        let isFormValid = true;

        Object.keys(this.items).forEach((item) => {
            const validators = this.items[item];

            
            let isValid = true;
            validators.forEach((validator) =>{
                isValid = validator(this.form[item].value) && isValid;     
            });

            

            if(!isValid){
                setError(this.form[item]);
            } else {
                clearError(this.form[item]);
            }

            isFormValid = isFormValid && isValid;
        });
        return isFormValid;
    }
}

function setError(item){
    clearError(item);
    if(item.name == 'fulltext'){
        const error = `<p class="validation_error">Fill in all the input fields and there must be at least 8 characters</p>`;
        item.classList.add('invalid');
        item.insertAdjacentHTML('afterend', error);
    } else {
        const error = `<p class="validation_error">Fill in all the input fields</p>`;
        item.classList.add('invalid');
        item.insertAdjacentHTML('afterend', error);
    }

}

function clearError(item){
    item.classList.remove('invalid');
    if (item.nextSibling) {
        item.closest('.create__item').removeChild(item.nextSibling);
    }
}
