/*
* This tool performs a comprehensive analysis of a given block of text.
* Input: A string of text provided via the 'textInput' variable.
* Output: A formatted string summarizing the analysis, including counts,
* word frequencies, and average word length.
*/

// The '$textInput' variable will be replaced by the text you provide in the tool's input.
const text = $textInput;

// First, check if the input text is valid.
if (!text || typeof text !== 'string' || text.trim() === '') {
  return 'Error: Please provide a valid text input to analyze.';
}

try {
  // --- CALCULATIONS ---

  // 1. Basic Counts
  const characterCount = text.length;
  const sentenceCount = (text.match(/[.!?]+/g) || []).length;

  // 2. Word Analysis (using a regular expression to find word-like sequences)
  // This gets all "words", converts them to lowercase, and filters out any empty results.
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  // Handle case where there are no words
  if (wordCount === 0) {
    return `Analysis Complete:\n- Character Count: ${characterCount}\n- No words found to analyze.`;
  }

  // 3. Average Word Length
  const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
  const avgWordLength = (totalWordLength / wordCount).toFixed(2);

  // 4. Word Frequency
  const wordFrequencies = {};
  for (const word of words) {
    wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
  }

  // Convert the frequency object to an array of [word, count] pairs and sort it.
  const sortedFrequencies = Object.entries(wordFrequencies).sort((a, b) => b[1] - a[1]);

  // 5. Most Common Words (Top 3)
  const mostCommonWords = sortedFrequencies.slice(0, 3).map(
    (item, index) => `${index + 1}. "${item[0]}" (appeared ${item[1]} times)`
  ).join('\n');

  // 6. Least Common Words (words that appeared only once)
  const uniqueWords = sortedFrequencies.filter(item => item[1] === 1);
  const uniqueWordsCount = uniqueWords.length;


  // --- FORMAT THE OUTPUT ---

  let result = `--- Text Analysis Report ---\n\n`;
  result += `Counts:\n`;
  result += `   - Characters: ${characterCount}\n`;
  result += `   - Words: ${wordCount}\n`;
  result += `   - Sentences: ${sentenceCount}\n\n`;

  result += `Word Stats:\n`;
  result += `   - Average Word Length: ${avgWordLength} characters\n`;
  result += `   - Unique words (appeared once): ${uniqueWordsCount}\n\n`;

  result += `Most Common Words:\n`;
  result += `${mostCommonWords || 'N/A'}\n`;
  result += `\n--------------------------`;

  // The function must return a single string.
  return result;

} catch (error) {
  console.error(error);
  // Return a user-friendly error message
  return 'An unexpected error occurred while analyzing the text.';
}