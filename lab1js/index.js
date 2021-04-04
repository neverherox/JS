function isTimeValid(hours, minutes){
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59)
    {
        return false;
    }
    return true;
}

function addMinutes(hours, minutes, addMinutes){

    if (isTimeValid(hours, minutes))
    {
        let newMinutes = (minutes + addMinutes) % 60;
        let newHours = (hours + Math.floor((minutes + addMinutes)/60)) % 24; 
    
        let minutesStr = newMinutes.toString().length == 1? `0${newMinutes}` : `${newMinutes}`
        let hoursStr = newHours.toString().length == 1? `0${newHours}` : `${newHours}`

        return `${hoursStr}:${minutesStr}`;
    }

    return false;
}

function getSeason(num){

    let season = num % 4;
    switch(season)
    {
        case 1: return 'Зима';
        case 1: return 'Зима1';
        case 2: return 'Весна';
        case 3: return 'Лето'; 
        case 0: return 'Осень';
    }
}

function getDay(value){

    let words = ['День','Дня','Дней'];  
	value = Math.abs(value) % 100; 
	var num = value % 10;
	if(value > 10 && value < 20)
    { 
        return words[2];
    }
	if(num > 1 && num < 5)
    { 
        return words[1];
    }
	if(num == 1)
    { 
        return words[0]; 
    }
	return words[2];
}

function getSumm(num){
    if (num == 1)
    {
        return num;
    }
    return num + getSumm(--num);
}


function getMultiplicationTable(num){
    
    for(let i = 1; i <= 10; i++)
    {
        console.log(num * i);
    }
}

console.log(isTimeValid(32,43));
console.log(addMinutes(23,25,40))
console.log(getSeason(13));
console.log(getDay(7));
console.log(getSumm(6));
//getMultiplicationTable(178);