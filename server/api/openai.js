require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// const openFun=async()=>{
//     const chatCompletion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{"role": "user", "content": "How was your day",}],
//         max_tokens:100
//       });
//       console.log(chatCompletion.choices[0].message.content);
//     }
    
//     openFun();
async function askAI(msg) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: "You are a daily planner, plan out a schedule for me to complete the following tasks. Your response must be in JSON format. {schedule: [ {task: 'taskname', start_time: '', end_time: '', tips:[tip 1, tip2, tip3]}] }" }, { role: 'user', content: msg}],
        model: 'gpt-3.5-turbo',
      });
    
      const result = JSON.parse(completion.choices[0].message.content)
      return result.schedule;
}



module.exports = askAI;