import { generateId } from "lucia";

export function genId() {
  return generateId(32);
}
