function getWords(line){

    return line.split(' ').filter(x => x.match(/#/)).map(x => x.replace(/#/,''));
}

function normalizeWords(words){

    return  [...new Set(words)].map(x => x.toLowerCase()).join(', ');
}

let phoneBook = new Map();

function addressBook(command){
    let splitted = command.split(' ');
    let cmd = splitted[0];
    
    switch(cmd)
    {
        case 'ADD':
            let name = splitted[1];
            let phones = splitted[2].split(',');
            if(phoneBook.has(name))
            {
                phones.forEach(num => {
                    phoneBook.get(name).push(num);
                });
            }
            else
            {
                phoneBook.set(name, phones);
            }
        break;

        case 'REMOVE':
            let num = splitted[1];
            for(let phones of phoneBook.values())
            {
                for(let i = 0; i < phones.length; i++)
                {
                    if (phones[i] == num)
                    {
                        phones.splice(i, 1);
                    }
                }
            }

        case 'SHOW':
            let mass = [];
            Array.from(phoneBook.keys()).forEach(key =>{
                 mass.push(`${key}: ${phoneBook.get(key).join(', ')}`)
                })
        return mass.sort();
    }
}

console.log(getWords('Прохожу курс в компании #senla по #javascript'));
console.log(normalizeWords(['web', 'JavaScript', 'web', 'programming','programming','JavaScript', 'join']));

addressBook('ADD Kirill 525-20-73,1234');
addressBook('ADD Pavel 525-20-73,1234');
addressBook('ADD Alex 555-20-01,55-20-03');
addressBook('ADD Alex 525-20-73,1234');


console.log(addressBook('SHOW'));

addressBook('REMOVE 525-20-73')

console.log(addressBook('SHOW'));

