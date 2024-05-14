"use client"
import React, { useEffect, useState } from 'react'
import Form from '../../components/Form'
import { useRouter, useSearchParams } from 'next/navigation'


//create prompt=iska ui hai yeh n then bakcend par jayega
const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");  //gets the id encoded in the url

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();


            //set the prompt already when user has come here
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
        //if the promptid exists invoke teh function
        if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if(!promptId) return alert('Prompt id not found')

        //frontend se backned
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }

        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form
            type='Update'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt} />
    )
}

export default UpdatePrompt;
