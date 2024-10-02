
import React, { useRef } from 'react';
import { Send } from 'lucide-react';

type ChatMessage = {
  id: number;
  sender: string;
  message: string;
  time: string;
};

type ChatWindowProps = {
  selectedUser: {
    name: string;
    image: string;
  };
  chatMessages: ChatMessage[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, chatMessages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const renderMessageGroup = (messages: ChatMessage[], sender: string) => (
    <div className="flex mb-4">
      <div className="flex mr-3 shrink-0">
        <img
          src={`${sender === "Alberto Rosen" ? '/avatar.webp' : '/google.png'}`}
          alt={sender}
          className="w-10 h-10 rounded-full mr-2 shrink-0"
        />
      </div>
      <div>
        <div className='flex items-center text-gray-400 gap-3'>
          <span className="font-semibold text-sm">{sender}</span>
          <p className='text-xs'>3:21 PM</p>
        </div>
        {messages.map((msg: ChatMessage) => (
          <div key={msg.id} className="rounded-lg p-1 mb-1 max-w-[80%]">
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const groupedMessages: ChatMessage[][] = chatMessages.reduce((acc: ChatMessage[][], message: ChatMessage) => {
    const lastGroup = acc[acc.length - 1];
    
    if (lastGroup && lastGroup[0].sender === message.sender) {
      lastGroup.push(message);
    } else {
      acc.push([message]);
    }
  
    return acc;
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 border-b bg-white border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className='relative'>
            <img
              src={selectedUser.image}
              alt={selectedUser.name}
              className="w-12 h-12 rounded-full"
            />
            <div className='h-3 w-3 bg-green-600 rounded-full absolute right-0 bottom-0'></div>
          </div>
          <div className='ml-2'>
            <h2 className="font-bold text-lg">{selectedUser.name}</h2>
            <p className="text-sm text-[#8a8a8a]">India | 5:31 PM local time</p>
          </div>
        </div>
        <div>
          <button className="bg-white text-gray-700 hover:bg-[#f0f0f0] transition-all ease-in-out duration-300 hidden md:inline-block font-medium px-8 py-3 rounded-full border border-gray-300 mr-2">View Profile</button>
          <button className="bg-[#020f20da] text-white px-8 py-3 font-medium rounded-full">Send Proposal</button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {groupedMessages.map((group, index) => (
          <React.Fragment key={index}>
            {renderMessageGroup(group, group[0].sender)}
          </React.Fragment>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      <div className="p-4">
        <div className="flex flex-col justify-between bg-white border shadow-md h-24 mb-24 p-1 rounded-xl">
          <input
            type="text"
            placeholder="Send a message to Alberto"
            className="flex px-4 py-2 w-full focus:outline-none"
          />
          <div className='flex justify-between mb-2'>
            <button className="text-gray-400 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button className="text-blue-500 px-4">
              <Send size={20} className='text-gray-400'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;