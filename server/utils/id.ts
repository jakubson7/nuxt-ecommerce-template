import { generateId } from "lucia";

export function genID() {
  return generateId(32);
}
