class Validators {
    static required(value = ''){
        return value && value.trim(); 
    }

    // Замыкаем длинну
    static minLength(length){
        return (value) => {
            return value.length >= length;
        };
    }
}


export {Validators};