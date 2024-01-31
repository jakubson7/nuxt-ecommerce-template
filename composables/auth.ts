import type { User } from "lucia";

export function useUser() {
  const user = useState<User | null>();
  return user;
}
