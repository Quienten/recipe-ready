// import OpenAI from "openai";
//
// import readline from "readline"
//
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
//
// const completion = await openai.createChatCompletion({
//     model: "gpt-3.5.turbo",
//     messages: [
//         {role: "user", content: "Hello"},
//
//     ]
// })



//
// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
//
// userInterface.prompt()
// userInterface.on("line", async input => {
//     const res = await openai.chat.completions.create({
//         messages: [{ role: "user", content: input }],
//         model: "gpt-3.5-turbo",
//     });
//
//     console.log(res.choices);
//     userInterface.prompt()
// })

// async function main() {
//     const res = await openai.chat.completions.create({
//         messages: [{ role: "user", content: "How are you ChatGPT?" }],
//         model: "gpt-3.5-turbo",
//     });
//
//     console.log(res.choices);
// }

//main();