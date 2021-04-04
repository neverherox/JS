function date(line){
    let value = new Date(line);

    return{

        add: function(num, unit){
            value['set' + unit](value['get' + unit]() + num)
            return this;
        },
        
        subtract: function(num, unit){
            value['set' + unit](value['get' + unit]() - num)
            return this;
        },

        value: function() {
            let year = value.getFullYear();
            let month = value.toLocaleString("ru",{month: '2-digit'});
            let day = value.getDate();
            let hours = value.getHours();
            let minutes = value.getMinutes();
            let result = `${year}-${month}-${day} ${hours}:${minutes}`;
            return result;
      }
    }
}

const unit = Object.freeze({
    years: 'FullYear', 
    months: 'Month',
    days: 'Date',
    hours: 'Hours',
    minutes: 'Minutes'
})

var time = date('2017-04-16 13:45');
console.log(time.subtract(1, unit.years).subtract(1, unit.years).value());