require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function askAI(msg) {
    const currTime = new Date()
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: `You are a daily planner, plan out a schedule for me to complete the following tasks. Keep in mind the current local time is ${currTime.toTimeString()} . The tasks cannot be in the past. Your response must be in JSON format. {schedule: [ {task: 'taskname', start_time: 'convert 12h', end_time: 'convert 12h', tips:[tip 1, tip2, tip3]}]` }, { role: 'user', content: msg}],
        model: 'gpt-3.5-turbo',
      });    
      const result = JSON.parse(completion.choices[0].message.content)
      return result.schedule;
}



module.exports = askAI;