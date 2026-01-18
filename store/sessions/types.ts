import { Message } from "ai";

export type SerializableMessage = Omit<Message, "createdAt"> & {
  createdAt: number;
};
