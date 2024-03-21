function extractTagsFromText(text?: string): string[] {
  const stopWords = ['que', 'para', 'pra'];

  const words = text
    ? text
        .toLowerCase()
        .split(/[\s/.,\\-]+/)
        .map(word => word.replace(/[^\w\s]/gi, ''))
        .filter(word => !stopWords.includes(word) && word.length >= 3)
    : [];

  const uniqueWords = Array.from(new Set(words));

  return uniqueWords;
}

export { extractTagsFromText };
