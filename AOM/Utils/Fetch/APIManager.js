import AutoRedirectFetch from "./AutoRedirectFetch";
import StringHelper from "../StringHelper";

const URI = {
    GOOGLE_SHEET: "https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json",
}

const SHEET_INFO = {
    EXCEL_ID: "1WGbsn7bZJGSMcuooQdJnJMCYIfmmHuWaNkCVCTxXIG0",

}

export default class APIManager {
    getFlashCardData(){
        let url = StringHelper.formatAPI(URI.GOOGLE_SHEET,SHEET_INFO.EXCEL_ID,"1");
        
        return AutoRedirectFetch("getFlashCardData",`${url}`,{
            method: "GET",
        });
    }
}