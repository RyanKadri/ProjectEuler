function calcNameScores(namesArray) {
    const A_CHAR_CODE = 65;
    return namesArray.sort()
        .map(nameRow => 
            nameRow.split("")
                .map(char => char.charCodeAt(0) - A_CHAR_CODE + 1)
                .reduce((acc, el) => acc + el, 0)
        ).reduce((acc, el, i) => acc + el * (i + 1), 0)
}

(async function() {
    const names = await fetch('https://projecteuler.net/project/resources/p022_names.txt')
        .then(resp => resp.text())
        .then(nameList => 
            nameList.trim()
                .split(",")
                .map(name => name.replace(/\"/g, ''))
        )
    
    console.log(calcNameScores(names));
})()