import pl from "./messages/pl.json";
import en from "./messages/en.json";

export type Locale = "pl" | "en";
export type Currency = "PLN" | "EUR";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pl",
  messages: { pl, en },
}));
