import conf from '../conf/conf.js';
import {Client,ID,Databases,Query,Storage} from 'appwrite'

export class service{
    client=new Client()
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)  
        .setProject(conf.appwriteProjectId);      
        
        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
                return await this.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                    )
        } 
        catch (error) {
            console.log("createPost ::"+error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
         catch (error) {
            console.log("updatePost ::"+error)
        }
    }

    async deletePost(slug){
        try {
             await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("deletePost ::"+error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } 
        catch (error) {
            console.log("getPost::"+error)
            return false;
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } 
        catch (error) {
            console.log("getPosts::"+error)
            return false;
        }
    }

    // file upload Services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } 
        catch (error) {
            console.log("uploadFile::"+error)
        }
    }

    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } 
        catch (error) {
            console.log("deleteFile::"+error)
            return false;
        }
    }

     getFilePreview(fileId){
       
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    } 


    }



const Service=new service()
export default Service