export const splitTextAtWordBoundary = (text: string, approximateMiddle: number): [string, string] => {
  // Find the last space before the middle point
  let splitIndex = approximateMiddle;
  while (splitIndex > 0 && text[splitIndex] !== ' ') {
    splitIndex--;
  }
  
  // If no space was found, use the approximate middle
  if (splitIndex === 0) {
    splitIndex = approximateMiddle;
  }

  return [
    text.substring(0, splitIndex).trim(),
    text.substring(splitIndex).trim()
  ];
};