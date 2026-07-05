import { v7 as uuidv7 } from 'uuid';

export const createUuidV7 = () => uuidv7();

export const assignUuidV7Id = <T extends { id?: string }>(data: T): T & { id: string } => ({
  ...data,
  id: data.id ?? createUuidV7(),
});
