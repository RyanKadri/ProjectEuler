handCount = {};
function playerOneWins(line) {
    const valMap = { A: 14, K: 13, Q: 12, J: 11, T: 10 }
    const game = parseGame(line);
    const p1Hand = readHand(game.player1);
    const p2Hand = readHand(game.player2);
    
    if(p1Hand.value > p2Hand.value) {
        return true;
    } else if(p1Hand.value < p2Hand.value) {
        return false;
    } else {
        if(p1Hand.subValue > p2Hand.subValue) {
            return true;
        } else if(p1Hand.subValue < p2Hand.subValue){
            return false;
        } else {
            const p1Others = p1Hand.others;
            const p2Others = p2Hand.others;
            for(let i = 0; i < p1Others.length; i++) {
                if(p1Others[i].value > p2Others[i].value) {
                    return true;
                } else if(p1Others[i].value < p2Others[i].value) {
                    return false;
                } else {
                    throw new Error('Ambiguous hand');
                }
            }
        }
    }

    function parseGame(line) {
        const cards = line.split(' ').map(card => ({ value: valMap[card[0]] || parseInt(card[0]), suit: card[1] }));
        return {
            player1: cards.slice(0, 5),
            player2: cards.slice(5,10)
        };
    }

    function readHand(hand) {
        hand.sort((a,b) => b.value-a.value);
        const checkers = [
            royalFlush, straightFlush, nOfKind(4), fullHouse,
            flush, straight, nOfKind(3), twoPair, nOfKind(2), highCard 
        ];
        let value = 10;
        for(const checker of checkers) {
            const parsed = checker(hand);
            if(parsed !== undefined) {
                handCount[checker.name] = (handCount[checker.name] || 0) + 1;
                return {...parsed, value }; 
            }
            value --;
        }
    }

    function royalFlush(hand) {
        if(straightFlush(hand) && hand[0].value === 14) {
            return parsedHand(0, []);
        }
    }

    function straightFlush(hand) {
        if(straight(hand) && sameSuit(hand)) {
            return parsedHand(hand[0].value, []);
        }
    }

    function fullHouse(hand) {
        const triple = nOfKind(3)(hand);
        if(triple) {
            const pair = nOfKind(2)(triple.others)
            if(pair) {
                return parsedHand(triple.subValue, []);
            }
        }
    }

    function flush(hand) {
        if(sameSuit(hand)) {
            return parsedHand(0, hand);
        }
    }

    function straight(hand) {
        if(hand.every((el, i) => hand[i-1] === undefined || el.value === hand[i-1].value - 1)) {
            return parsedHand(hand[0].value, []);
        }
    }

    function twoPair(hand) {
        const firstPair = nOfKind(2)(hand);
        if(firstPair) {
            const secondPair = nOfKind(2)(firstPair.others);
            if(secondPair) {
                return Math.max(firstPair.subValue, secondPair.subValue, secondPair.others);
            }
        }
    }

    function highCard(hand) {
        return parsedHand(0, hand);
    }

    function nOfKind(target) {
        return function(hand) {
            let count = 1;
            let lastValue = hand[0].value;
            const others = [];
            let included = [hand[0]];
            for(let i = 1; i < hand.length; i++) {
                const card = hand[i];
                if(card.value === lastValue) {
                    count ++;
                    included.push(card);
                } else {
                    lastValue = card.value;
                    count = 1;
                    others.push(...included);
                    included = [card];
                }
                if(count === target) {
                    others.push(...hand.slice(i + 1))
                    return parsedHand(lastValue, others);
                }
            }
        }
    }

    function sameSuit(hand) {
        const suit = hand[0].suit;
        return hand.every(card => card.suit === suit);
    }

    function parsedHand(subValue, others) {
        return { subValue, others }
    }
}

(async () => {
    let downloadLoc;
    if(typeof window !== 'undefined') {
        downloadLoc = document.querySelector('.problem_content a').href;
    } else {
        downloadLoc = 'https://projecteuler.net/project/resources/p054_poker.txt';
    }
    const file = await fetch(downloadLoc).then(res => res.text());
    const lines = file.split('\n');
    const games = lines.filter(line => line.trim() !== '');
    console.log(games.filter(playerOneWins).length);
    console.log(handCount);
})()