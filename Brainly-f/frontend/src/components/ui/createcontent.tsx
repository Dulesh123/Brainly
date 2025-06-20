import { useRef, useState } from "react";
import { CrossIcon } from "../icons/crossicon";
import Button from "./button";
import { Input } from "./input";
import axios from "axios";

export function CreatecontentModel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
 

  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
 const typeref = useRef<HTMLInputElement>(null);
  async function submit() {
    const title = titleref.current?.value?.trim();
    const link = linkref.current?.value?.trim();
     const type = typeref.current?.value?.trim();

    if (!title || !link) {
      alert("Please fill in both title and link.");
      return;
    }
console.log(localStorage.getItem('token'))
    try {
      await axios.post(
        "http://localhost:3000/api/v1/content",
        {
          title,
          link,
          type,
        },
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        }
      );
      alert("Content added");

      
    } catch (e) {
      console.error("Error submitting content:", e);
      alert("Failed to add content");
    }
  }

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <CrossIcon size="lg" />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Add New Content
            </h2>

            <div className="space-y-4">
              <Input placeholder="Title" ref={titleref} />
              <Input placeholder="Link" ref={linkref} />
               <Input placeholder="Type" ref={typeref} />
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <Button variant="primary" text="Submit" onClick={submit} size="lg" />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
