import { PrismaClient } from "@/generated/prisma";
import { chatsWithMessages } from "@/data/mock";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log("🌱 Starting DB seeding...");

    await prisma.message.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.user.deleteMany();

    const userMap = new Map<string, string>(); // email -> id

    // Collect all unique users
    const allUsers = new Map<string, { id: string; name: string; email: string; image: string }>();

    for (const chat of chatsWithMessages) {
      for (const user of chat.participants) {
        if (!allUsers.has(user.email)) {
          allUsers.set(user.email, {
            id: user.id,
            name: user.name,
            email: user.email,
            image: "",
          });
        }
      }
    }

    // Insert users
    for (const user of allUsers.values()) {
      const createdUser = await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: true,
          image: user.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      userMap.set(createdUser.email, createdUser.id);
    }

    // Insert chats and messages
    for (const chat of chatsWithMessages) {
      const messageIds: string[] = [];
      const createdChat = await prisma.chat.create({
        data: {
          id: chat.id,
          participants: {
            connect: chat.participants.map(p => ({ id: userMap.get(p.email)! })),
          },
        },
      });
      if(!chat.messages) continue

      // Insert messages for this chat
      for (const msg of chat.messages) {
        const createdMsg = await prisma.message.create({
          data: {
            id: msg.id + "-" + chat.id, // to ensure uniqueness across chats
            senderId: userMap.get(msg.sender.email)!,
            text: msg.text,
            chatId: createdChat.id,
            createdAt: msg.createdAt,
            updatedAt: msg.createdAt,
          },
        });
        messageIds.push(createdMsg.id);
      }

      // Set lastMessageId on chat
      const lastMessageId = messageIds[messageIds.length - 1];
      await prisma.chat.update({
        where: { id: createdChat.id },
        data: {
          lastMessageId,
        },
      });
    }

    console.log("✅ Seeding complete.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
