const Capitalize = str => {
	// Capitalize everything prepended by spaces
	str = str.toLowerCase();
	const words = str.split(' ');
	let capitalizedWords = [];
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		if (word.length !== 0) {
			capitalizedWords.push(word[0].toUpperCase() + word.substring(1));
		}
	}
	const capitalizedWordString = capitalizedWords.join(' ');

	// Capitalize everything prepended by opening brackets
	const wordsFromBrackets = capitalizedWordString.split('(');
	const capitalizedBracketWords = wordsFromBrackets.map(word => word[0].toUpperCase() + word.substring(1));
	const capitalizedBracketWordString = capitalizedBracketWords.join('(');

	return capitalizedBracketWordString;
}

export default Capitalize;