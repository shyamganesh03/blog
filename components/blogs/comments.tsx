"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useBlogContext } from "@/store/blogs";
import { UserIcon } from "lucide-react";

const CommandSection = ({ items = [], id }: { items: any[]; id: string }) => {
  const { addComment } = useBlogContext();

  const [commentDetails, setCommentDetails] = useState({
    name: "",
    comment: "",
  });

  const handleCommentChange = (event: any) => {
    setCommentDetails({
      ...commentDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (!commentDetails.name || !commentDetails.comment) {
      alert("Please fill out all fields.");
      return;
    }
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    addComment(id, { ...commentDetails, commentedDate: formattedDate });
    setCommentDetails({ name: "", comment: "" });
  };

  return (
    <div className='w-full max-w-2xl space-y-6 px-4 py-8'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-bold'>Comments</h2>
        <p className='text-gray-500 dark:text-gray-400'>
          Share your thoughts and feedback.
        </p>
      </div>
      <div className='space-y-6'>
        {items?.map((item: any, index) => {
          return (
            <div className='flex items-start gap-4' key={index}>
              <Avatar className='w-10 h-10 border'>
                <AvatarImage src='/placeholder-user.jpg' alt='@shadcn' />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div className='grid gap-1.5 flex-1'>
                <div className='flex items-center gap-2'>
                  <div className='font-semibold'>{item?.name || ""}</div>
                  <div className='text-xs text-gray-500 dark:text-gray-400'>
                    {item?.commentedDate || ""}
                  </div>
                </div>
                <div>{item?.comment || ""}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='space-y-4'>
        <h3 className='text-xl font-bold'>Add a comment</h3>
        <form className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              placeholder='Enter your name'
              value={commentDetails.name}
              onChange={handleCommentChange}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='comment'>Comment</Label>
            <Textarea
              id='comment'
              placeholder='Write your comment here...'
              className='min-h-[100px]'
              value={commentDetails.comment}
              onChange={handleCommentChange}
            />
          </div>
          <Button type='button' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommandSection;
