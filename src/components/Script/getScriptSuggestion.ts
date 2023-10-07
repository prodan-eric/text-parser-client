const suggestions = [
  "capitalize all words that start with a capital letter",
  "change the order of the words randomly",
  "remove all words that end with the letter S",
]

const getScriptSuggestion = () => {
  const randomIndex = Math.floor(Math.random() * suggestions.length)
  return `Something like "${suggestions[randomIndex]}"`
}

export default getScriptSuggestion
