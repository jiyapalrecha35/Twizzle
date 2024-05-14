import { connectToDB } from '../../../../utils/db'
import Prompt from '../../../../models/prompt';

//every time to create a new prompt
export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();
    try {
        //evry time need to connect to db as it is a lambda function,it dies once it does its job
        await connectToDB();
        //create new prompt and save to db
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (err) {
        console.log(err);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}