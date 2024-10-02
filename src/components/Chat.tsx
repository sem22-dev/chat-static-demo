import { Send } from 'lucide-react';
import React, { useState, useRef } from 'react';

const messages = [
  { id: 1, name: 'Alexa Jones', message: 'sounds good, but we really have the bandwidth to...', time: '12h ago', image: '/avatar2.webp' },
  { id: 2, name: 'Alberto Rosen', message: 'sounds good, but we really have the bandwidth to...', time: '12h ago', image: '/avatar.webp' },
  { id: 3, name: 'Haley McGonigal', message: 'sounds good, but we really have the bandwidth to...', time: '12h ago', image: '/avatar3.jpeg' },
  { id: 4, name: 'Phil Dunphy', message: 'sounds good, but we really have the bandwidth to...', time: '12h ago', image: '/avatar4.jpeg' },
];

const chatMessages = [
  { id: 1, sender: 'Alberto Rosen', message: "beautiful! we would like to redo our entire UI (it's a job board type thing, pre MVP). Both the design but also UX are very mediocre now haha", time: '5:31 PM local time' },
  { id: 2, sender: 'Google Inc.', message: "beautiful! we would like to redo our entire UI (it's a job board type thing, pre MVP). Both the design but also UX are very mediocre now haha", time: '3:21 PM' },
  { id: 3, sender: 'Alberto Rosen', message: "this is the first message", time: '3:21 PM' },
  { id: 4, sender: 'Alberto Rosen', message: "this is the second message", time: '3:21 PM' },
  { id: 5, sender: 'Alberto Rosen', message: "continous messages must be grouped like this together", time: '3:21 PM' },
  { id: 6, sender: 'Google Inc.', message: "beautiful! we would like to redo our entire UI (it's a job board type thing, pre MVP). Both the design but also UX are very mediocre now haha", time: '3:21 PM' },
  { id: 7, sender: 'Alberto Rosen', message: "beautiful! we would like to redo our entire UI (it's a job board type thing, pre MVP). Both the design but also UX are very mediocre now haha", time: '3:21 PM' },
];

type ChatMessage = {
    id: number;
    sender: string;
    message: string;
    time: string;
  };
  

export default function Chat() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState({
    name: 'Alberto Rosen',  
    image: '/avatar.webp'  
  });
  const messageEndRef = useRef(null);

  const handleSelectMessage = (msg: { id: number; name: string; image: string }) => {
    setSelectedMessage(msg.id);
    setSelectedUser({ name: msg.name, image: msg.image });
  };


  const renderMessageGroup = (messages: ChatMessage[], sender: string) => (
    <div className="flex mb-4">
      <div className="flex mr-3 shrink-0">
        <img
          src={`${sender == "Alberto Rosen" ? '/avatar.webp' : '/google.png'}`}
          alt={sender}
          className="w-10 h-10 rounded-full mr-2  shrink-0"
        />
       
      </div>
      < div>
        <div className='flex items-center text-gray-400 gap-3'>
            <span className="font-semibold text-sm">{sender}</span>
            <p className='text-xs'>3:21 PM</p>
        </div>
        {messages.map((msg: any) => (
            <div key={msg.id} className=" rounded-lg p-1 mb-1 max-w-[80%]">
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
    <main className="h-screen flex">
      {/* left */}
      <div className=" w-full md:w-1/3 flex flex-col border-r  border-gray-200">
        <h1 className="text-3xl font-bold p-4 border-gray-200 my-4">Messages</h1>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex p-4 cursor-pointer relative ${
                selectedMessage === msg.id ? 'bg-sky-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectMessage(msg)}

            >
              <img 
                src={msg.image}
                alt={msg.name} 
                className="w-14 h-14 shrink-0 object-contain rounded-full mr-4"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-gray-500 truncate">{msg.message}</p>
              </div>
              <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
              {selectedMessage === msg.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* right */}
      <div className=" hidden w-2/3 md:flex flex-col">
        {/* Fixed header */}
        <div className="p-4 border-b bg-white  border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className=' relative'>
                <img
                src={selectedUser.image}
                alt={selectedUser.name}
                className="w-12 h-12 rounded-full"
              />
                <div className='h-3 w-3 bg-green-600 rounded-full absolute right-0 bottom-0'></div>
            </div>
            <div className='ml-3'>
              <h2 className="font-bold text-lg">{selectedUser.name}</h2>
              <p className="text-sm text-[#8a8a8a]">India | 5:31 PM local time</p>
            </div>
          </div>
          <div>
            <button className="bg-white text-gray-700 hover:bg-[#f0f0f0] transition-all ease-in-out duration-300 hidden lg:inline-block font-medium px-8 py-3 rounded-full border border-gray-300 mr-2">View Profile</button>
            <button className=" bg-[#020f20da] text-white px-8 py-3 font-medium rounded-full">Send Proposal</button>
          </div>
        </div>
                
             {/* Scrollable message area */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          {groupedMessages.map((group, index) => (
            <React.Fragment key={index}>
              {renderMessageGroup(group, group[0].sender)}
            </React.Fragment>
          ))}
          <div ref={messageEndRef} />
        </div>
                
        {/* Input area */}
        <div className=" p-4">
          <div className="flex flex-col justify-between bg-white border shadow-md h-24 mb-20 p-1 rounded-xl">
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
    </main>
  );
}