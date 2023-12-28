export const FIRST_MSG = "Hello, I am Chef Marcus, I will be helping you cook today! Please provide me your personal goals for this meal."

const URL_PREFIX = process.env.NODE_ENV === "production" ? "https://recipeready.onrender.com" : ""
export const URL_ANOTHER = URL_PREFIX + "/another"
export const URL_WHAT_TO_COOK = URL_PREFIX + "/what_to_cook"
export const URL_EMBED_YOUTUBE = URL_PREFIX + "/embed_youtube"