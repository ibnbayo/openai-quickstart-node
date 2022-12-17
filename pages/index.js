import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [wordInput, setWordInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: wordInput }),
    });
    const data = await response.json();
    console.log(`Index js 19 is ${data}`)
    setResult(data.result);
    setWordInput("");
  }
  //The above code is defining an async function called onSubmit, 
  //which is meant to handle a form submission event. When the form is submitted, 
  //the function makes a POST request to the /api/generate endpoint, 
  //with the animalInput variable as the request body.

//The headers property specifies the request headers, 
//in this case setting the Content-Type to application/json. 
//The body property specifies the request body, in this case a JSON string 
//representation of an object with a single property called animal, 
//whose value is the current value of the animalInput variable.

//The function then waits for the response from the server 
//and parses the JSON data contained in the response.
// The result property of the data is then set as the value of the result 
//state variable, and the animalInput state variable is reset to an empty string.

  return (
    <div>
      <Head>
        <title>OpenAI Fiddle</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        
        <h3>Article generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="word"
            placeholder="Enter a word or phrase"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
          />
          <input type="submit" value="Generate article" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
