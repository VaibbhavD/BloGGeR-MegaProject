import conf from "../conf/conf.js";
import {Client,Account,ID} from "appwrite";


export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)  
        .setProject(conf.appwriteProjectId);      
        
        this.account=new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const useraccount = await this.account.create(ID.unique(),email,password,name)
             if (useraccount) {
                return this.login({email,password});
             }
             else{
                return useraccount;
             }
        }
         catch (error) {
            console.log("createAccount::"+error)
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email,password);
        } 
        catch (error) {
            console.log("login::"+error)
            throw error;
        }
    }

    async getCurrentuser(){
        try {
            return await this.account.get();
        }
         catch (error) {
           console.log("getCurrentuser::",error)
           
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("logout::"+error)
        }
    }
}


const authService=new AuthService()

export default authService