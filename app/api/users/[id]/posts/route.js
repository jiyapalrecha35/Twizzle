import { connectToDB } from '../../../../../utils/db'
import Prompt from '../../../../../models/prompt';


//particular user,uske sare prompts
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch all prompts", { status: 500 })

    }
}