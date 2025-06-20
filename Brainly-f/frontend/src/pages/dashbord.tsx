import { useState } from "react";
import "../App.css";
import Button from "../components/ui/button";
import { PlusIcon } from "../components/icons/plusicon";
import { Card } from "../components/ui/card";
import { ShareIcon } from "../components/icons/share";
import { CreatecontentModel } from "../components/ui/createcontent";
import { Sidebar } from "../components/ui/sidebar";
import { useContent } from "../hooks/useContent";

function DashBord() {
  const [modelopen, setModelopen] = useState(false);
  const content = useContent();

  function openModal() {
    setModelopen(true);
  }

  function closeModal() {
    setModelopen(false);
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Your SecondBrain</h1>
          <div className="flex gap-4">
            <Button
              variant="secondry"
              size="md"
              text="Share"
              starticon={<ShareIcon size="md" />}
            />
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              starticon={<PlusIcon size="md" />}
              onClick={openModal}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-8">
          

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {content?.map(({ title, type, link }, index) => (
              <Card key={index} title={title} type={type} link={link} />
            ))}
          </div>
        </div>
      </div>

      {/* Create Content Modal */}
      <CreatecontentModel open={modelopen} onClose={closeModal} />
    </div>
  );
}

export default DashBord;
