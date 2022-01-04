class TransformService {
    static convertObjectToArray(fireBaseData){
        return Object.keys(fireBaseData).map((key) => {
            const item = fireBaseData[key];
            item.id = key;

            return item;
        });
    }
}

export {TransformService};