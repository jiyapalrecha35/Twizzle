import { connectToDB } from '../../../utils/db'
import Prompt from '../../../models/prompt';

//to fetch all the posts from the DB

export const GET = async (request) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 }) 

    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch all prompts", { status: 500 })

    }
}