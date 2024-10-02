
import React from 'react';

type Message = {
  id: number;
  name: string;
  message: string;
  time: string;
  image: string;
};

type MessageListProps = {
  messages: Message[];
  selectedMessage: number | null;
  onSelectMessage: (msg: Message) => void;
};

const MessageList: React.FC<MessageListProps> = ({ messages, selectedMessage, onSelectMessage }) => {
  return (
    <div className="w-full flex flex-col border-r border-gray-200">
      <h1 className="text-3xl font-bold p-4 border-gray-200 my-4">Messages</h1>
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex p-4 cursor-pointer relative ${
              selectedMessage === msg.id ? 'bg-sky-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectMessage(msg)}
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
  );
};

export default MessageList;