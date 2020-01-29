
export default class StringHelper {
    
    static formatAPI(str){
        let args = Array.prototype.slice.call(arguments,1);
        let count = 0;
        return str.replace(/({[a-zA-Z_]*})/g,(match)=>{
            count = count + 1;
            return typeof args[count - 1] != "undefined" ? args[count-1] : match;
        });
    }
}