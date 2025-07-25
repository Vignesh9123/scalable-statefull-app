import { Chat } from "@/types"
export const chats:Chat[] = [
    {
      id: "1",
      participants: [
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        {
          id: "2",
          name: "Jane Doe Main",
          image: "",
          email: "jane@doe",
        },
      ],
      lastMessage: {
        id: "2",
        sender: {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        text: "Hi from Vignesh D",
        createdAt: new Date(),
      },
    },
    {
      id: "2",
      participants: [
        {
          id: "3",
          name: "Alice Smith",
          image: "",
          email: "alice@smith",
        },
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
      ],
      lastMessage: {
        id: "2",
        sender: {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        text: "I'm good, Alice! How about you?",
        createdAt: new Date(),
      },
    },
    {
      id: "3",
      participants: [
        {
          id: "5",
          name: "Charlie Brown",
          image: "",
          email: "charlie@brown",
        },
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
      ],
      lastMessage: {
        id: "2",
        sender: {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        text: "Yes, I'll be there in 10 minutes.",
        createdAt: new Date(),
      },
    },
    {
      id: "4",
      participants: [
        {
          id: "7",
          name: "Eve Turner",
          image: "",
          email: "eve@turner",
        },
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
      ],
      lastMessage: {
        id: "2",
        sender: {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        text: "Almost done, I'll send it soon.",
        createdAt: new Date(),
      },
    },
    {
      id: "5",
      participants: [
        {
          id: "10",
          name: "Grace Lee",
          image: "",
          email: "grace@lee",
        },
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
      ],
      lastMessage: {
        id: "1",
        sender: {
          id: "10",
          name: "Grace Lee",
          image: "",
          email: "grace@lee",
        },
        text: "Vignesh, are you joining the call?",
        createdAt: new Date(),
      },
    },
    {
      id: "6",
      participants: [
        {
          id: "11",
          name: "Henry Ford",
          image: "",
          email: "henry@ford",
        },
        {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
      ],
      lastMessage: {
        id: "1",
        sender: {
          id: "EHnr3RONJ69Ovlq4ZgLzOA9uk38nyQme",
          name: "Vignesh D",
          image: "",
          email: "vignesh.d9123@gmail.com",
        },
        text: "Hi Henry, I sent the document.",
        createdAt: new Date(),
      },
    },
]

export const chatsWithMessages:Chat[] = chats.map(chat => {
  const [userA, userB] = chat.participants;
  return {
    ...chat,
    messages: [
      {
        id: '1',
        sender: userA,
        text: `Hi ${userB.name.split(' ')[0]}, how are you?`,
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: '2',
        sender: userB,
        text: `I'm good, ${userA.name.split(' ')[0]}! How about you?`,
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '3',
        sender: chat.lastMessage.sender,
        text: chat.lastMessage.text,
        createdAt: chat.lastMessage.createdAt,
      },
    ],
  };
});


