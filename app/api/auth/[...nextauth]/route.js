//set up providers
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "../../../../utils/db"
import User from "../../../../models/user";

//every nextjs route is a serverless route

// console.log(process.env.GOOGLE_ID)
// console.log(process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            //serverless route-lambda function -that opens up only when it is called
            //that time server is spinned and that makes connection to db and the server is not running always
            try {
                await connectToDB();

                //check if user exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                //create new one if not
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }


})

export { handler as GET, handler as POST }