import APIManager from "../APIManager";
import LocalSQLite from "../../SQLite/LocalSQLite";

export default class FetchAllCard{

    api = new APIManager();
    sqlite = new LocalSQLite();

    getLocalData = async () => {
        let userData = await this.sqlite.selectAllUsers();
        if(userData && userData.length > 0){
            userData = userData.map((item)=>{
                return {
                    effectTitle: item.effect,
                    reference: item.reference,
                    youtubeLink: item.youtubeLink,
                }
            });
        }
        return (userData && userData.length > 0)? userData : [];
    }

    fetchData = async () => {
        let response = await this.api.getFlashCardData();
        let responseJSON = await response.json();

        let data = [];
        console.log("[AllFlashCard] fetchData", responseJSON);
        if(responseJSON && responseJSON.feed && responseJSON.feed.entry && responseJSON.feed.entry.length > 0){
            let dataSrc = responseJSON.feed.entry;
            data = dataSrc.map((item,index)=>{
                return {
                    effectTitle: item.gsx$effecttitle.$t,
                    reference: item.gsx$reference.$t,
                    youtubeLink: item.gsx$youtubelink.$t,
                }
            })
        }
        return (data && data.length > 0)? data : [];
    }

    fetchAllCardData = async () => {
        let d1 = await this.getLocalData();
        let d2 = await this.fetchData();
        return [...d1,...d2];
    }

}
