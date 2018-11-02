function decryptXOR(message, keyLength) {
    const keyChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const allowedChars = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ., ()=*"/1234567890-?!;\''.split(''));
    let solved = false;
    const guessGenerator = generateGuesses();
    let generated;
    let messageGuess;
    while(!solved && !(generated = guessGenerator.next()).done) {
        const guess = generated.value;
        solved = true;
        messageGuess = []
        for(let messagePos = 0; messagePos < message.length; messagePos++) {
            const decryptAttempt = String.fromCharCode(message[messagePos] ^ guess[messagePos % keyLength]);
            if(!allowedChars.has(decryptAttempt)) {
                solved = false;
                break;
            } else {
                messageGuess.push(decryptAttempt);
            }
        }
    }
    return messageGuess;
    

    function* generateGuesses() {
        for(let key = 0; key < keyChars.length ** keyLength; key ++) {
            const guess = [];
            let remainder = key;
            for(let i = 0; i < keyLength; i++) {
                guess.push((remainder % keyChars.length) + 97);
                remainder = Math.floor(remainder / keyChars.length);
            }
            yield guess;
        }
    }
}

(async () => {
    let link;
    if(typeof window !== 'undefined') {
        link = document.querySelector('.problem_content a').href;
    } else {
        link = 'https://projecteuler.net/project/resources/p059_cipher.txt';
    }
    const content = await fetch(link).then(res => res.text());
    const message = content.trim().split(',');
    const decrypted = decryptXOR(message, 3)
    console.log(decrypted.join(""));
    console.log(decrypted.reduce((acc, el) => acc + el.charCodeAt(0), 0));
})()