
export default class StringHelper {
    
    static formatAPI(str){
        let args = Array.prototype.slice.call(arguments,1);
        let count = 0;
        return str.replace(/({[a-zA-Z_]*})/g,(match)=>{
            count = count + 1;
            return typeof args[count - 1] != "undefined" ? args[count-1] : match;
        });
    }

    static fotmatYT(str){
        let regPrefix = /^https:\/\/youtu\.be\//gi;                   // fit to https://youtu.be/
        let regPrefix2 = /^https:\/\/www\.youtube\.com\/watch\?v=/gi; // fit to https://www.youtube.com/watch?v=
        let regSuffix = /^[a-zA-Z0-9-]+/gi;  // fit to character or number, Ex. Mefjb-oXD7

        let isYTLink = regPrefix.test(str) || regPrefix2.test(str);
        if(isYTLink == true){
            let temp = str.replace(regPrefix,"");
            temp = str.replace(regPrefix2,"");
            id = temp.match(regSuffix);
            return id[0];
        }else{
            return false;
        }
    }
}