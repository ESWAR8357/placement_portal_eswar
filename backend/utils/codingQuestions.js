const topics = ["arrays", "strings", "linked-lists", "trees", "dynamic-programming"];
const difficulties = ["easy", "medium", "hard"];

// Generate 4 questions per topic per difficulty => 4 * 5 * 3 = 60
const codingQuestionsData = [];

topics.forEach((topic) => {
  difficulties.forEach((difficulty) => {
    for (let i = 1; i <= 4; i++) {
      codingQuestionsData.push({
        title: `${topic.replace(/-/g, ' ')} ${difficulty} problem ${i}`,
        description: `Solve the ${topic.replace(/-/g, ' ')} ${difficulty} challenge number ${i}. Provide a correct and efficient implementation.`,
        difficulty,
        sampleInput: `Example input for ${topic} ${difficulty} ${i}`,
        sampleOutput: `Example output for ${topic} ${difficulty} ${i}`,
        constraints: `Typical constraints for ${topic} problems: time and memory limits apply.`,
        topic
      });
    }
  });
});

export default codingQuestionsData;
