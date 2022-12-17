import { Configuration, OpenAIApi, createGeneration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.word),
    temperature: 1,
    max_tokens: 1000,
  });

  console.log(`Generate js 17 is ${completion.data}`)
  // stream.on('data', (chunk) => {
  //   // Handle the data chunk here
  //   console.log(chunk.toString());
  // });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(word) {
  const capitalizedAnimal =
    word[0].toUpperCase() + word.slice(1).toLowerCase();
  return `Write a 100 word article about  ${capitalizedAnimal}`;
}
