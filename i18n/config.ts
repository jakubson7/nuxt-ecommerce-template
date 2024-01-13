import pl from "./messages/pl.json";
import en from "./messages/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pl",
  messages: { pl, en },
}));
