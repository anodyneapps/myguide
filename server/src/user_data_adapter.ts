import * as mongodb from "mongodb";
import { User } from "./user";
 
export const collections: {
   users?: mongodb.Collection<User>;
} = {};
 
export async function connectToUserDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applyUserSchemaValidation(db);
 
   const employeesCollection = db.collection<User>("users");
   collections.users = employeesCollection;
}


 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applyUserSchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "position", "level"],
           additionalProperties: false,
           properties: {
               _id: {},
               user_name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               display_name: {
                   bsonType: "string",
                   description: "'position' is required and is a string",
                   minLength: 5
               },
                oauth_id: {
                     bsonType: "string",
                     description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                },
                email_address: {
                     bsonType: "string",
                     description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                },
                user_preference: {
                     bsonType: "object",
                     description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                     properties: {
                            follow_music_events: {
                                bsonType: "boolean",
                                description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                            },
                            follow_meetup_events: {
                                bsonType: "boolean",
                                description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                            },
                            follow_food_events: {
                                bsonType: "boolean",
                                description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                            },
                            location: {
                                bsonType: "string",
                                description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                            },
                        }
                }
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "users",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("users", {validator: jsonSchema});
       }
   });
}