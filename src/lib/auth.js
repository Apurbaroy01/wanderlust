import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("wanderlust");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client
    }),
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            // max age of the cookie in seconds (e.g., 7 days)
            maxAge: 7 * 24 * 60 * 60,
        }
    },
    plugins: [
        jwt(),
    ]
});