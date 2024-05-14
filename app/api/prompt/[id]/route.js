import { connectToDB } from '../../../../utils/db';
import Prompt from '../../../../models/prompt';

// GET request to find a particular prompt by id
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// PATCH request to edit a particular prompt based on id
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the prompt", { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

// DELETE request to delete a prompt based on id
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};
