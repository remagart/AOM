import TimeoutFetch from "./TimeoutFetch";

export default async function AutoRedirectFetch(apiType,url,options){
    //TODO: Network check

    try{
        let response = await TimeoutFetch(url,options);
        if(response != null && response != undefined){
            if(response.status >= 400){
                let responseJSON = await response.json();
                let err = new Error();
                err.status = response.status;
                err.message = responseJSON.message || "no message";
                err.dataJSON = responseJSON;

                // TODO: Token ckeck

                throw err;
            }
        }
        else{
            throw new Error("response null or undefined");
        }

        return response;

    }
    catch(err){
        console.warn("AutoRedirectFetch error: ",err);
        console.warn("error type: ",apiType);
        return;
    }
}