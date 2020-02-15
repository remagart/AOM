import SQLite from "react-native-sqlite-storage";

const DB_NAME = "myTest.db";
const DB_LOCATION = '~www/myTest.db';
const TABLE_USER_FLASH_CARD = "userFlashCard";

const SQL = {
    SELECT_ALL: "select * from " + TABLE_USER_FLASH_CARD,
} 

export default class LocalSQLite {

    // dbObj = null;

    openDB = () => {
        this.dbObj = SQLite.openDatabase({
            name: DB_NAME,
            createFromLocation: DB_LOCATION,
        },(success)=>{
            console.log("Open success",success);
        },(error)=>{
            console.log("Open Fail",error);
        });
    }

    closeDB = () => {
        if(this.dbObj){
            this.dbObj.close(()=>{
                console.log("close DB success");
            },(err)=>{
                console.log("close DB fail",err);
            })
        }
    }

    executeSQL = async (sql) => {
        await this.openDB();

        let response =  new Promise((resolve,reject)=>{
            this.dbObj.transaction((db)=>{
                db.executeSql(sql,[],(tx,result)=>{
                    console.log("executeSQL success");
                    resolve(result);
                },(err)=>{
                    console.log("executeSQL err",err);
                    reject(err);
                })
            });
        });

        this.closeDBTimer = setTimeout(()=>{
            this.closeDB();
            clearTimeout(this.closeDBTimer);
        },3000);

        return response;
    }

    selectAllUsers = async () => {
        let result = await this.executeSQL(SQL.SELECT_ALL);  

        if(result){
            let users = [];
            let rows = result.rows;
            let i = 0;
            for(i = 0;i < rows.length;i++){
                users.push({...rows.item(i)});
            }
            console.log("users",users);
            // this.closeDB();
            return users;
        }
        else{
            console.log("selectAllUsers fail");
        }
    }


}