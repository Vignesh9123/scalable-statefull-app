"use server"
import prisma from "@/lib/prisma";
import { Chat } from "@/types";

export const fetchChats = async (userId: string) =>{
    const chats:Chat[] = await prisma.chat.findMany({where:{participants:{some:{id:userId}}}, include:{participants:true, lastMessage:{
        include:{sender:true}
    }}});
    console.log(chats);
    return chats
}

export const fetchChat = async (chatId: string) => {
    const chat = await prisma.chat.findUnique({where:{id:chatId}, include:{participants:true, lastMessage:{include:{sender:true}}, messages:{include:{sender:true}}}});
    return chat
}