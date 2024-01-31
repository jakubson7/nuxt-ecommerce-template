import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  // @ts-ignore
  user.value = await $fetch("/api/auth/user");
});
