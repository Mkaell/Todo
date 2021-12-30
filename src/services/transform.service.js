export class TransformService {
    static convertObjectToArray(fireBaseData){
        return Object.keys(fireBaseData).map((key) => {
            console.log(key);
            const item = fireBaseData[key];
            
            item.id = key;
            console.log(item);
            return item;
        });
    }
}