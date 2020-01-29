export default function timeoutFetch(url,options){
    let timeout = 10 * 1000;

    if(options && "timeout" in options){
        timeout = options.timeout;
    }

    return Promise.race([
        fetch(url,options),
        new Promise((resolve,reject)=>{
            let error = new Error("fetch timeout");
            error.isTimeout = true;
            setTimeout(()=>reject(error),timeout);
        })
    ]);

}