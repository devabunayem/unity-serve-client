import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://abunayemprogrammer_db_user:D2SO9b60PZGJIe8R@cluster0.qjqm5dx.mongodb.net/unity_serve_db?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const db = client.db("unity_serve_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "9f8a3c4e1b7d5e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});
