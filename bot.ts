import { Bot } from "https://deno.land/x/grammy@v1.14.1/mod.ts";

const bot = new Bot("462746594:AAFXEmMQmqGO4wbVlMLttJcxcHYafOTFOek");

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message", async (ctx) => {
	const body = JSON.stringify({
	  "model": "text-davinci-003",
	  "prompt": `You: ${await ctx.update.message.text}`,
	  "temperature": 0.5,
	  "max_tokens": 300,
	  "top_p": 1,
	  "frequency_penalty": 0.5,
	  "presence_penalty": 0,
	  "stop": [
		"You:"
	  ]
	});
	let resp = await fetch("https://api.openai.com/v1/completions", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		"Authorization": "Bearer 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",
	  },
	  body,
	});
	const bodyResponse = await resp.json();
	console.log(ctx.update.message.text);
	ctx.reply(bodyResponse.choices[0].text);
	console.log(bodyResponse.choices[0].text);
});

bot.start();