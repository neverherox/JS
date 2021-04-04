const field = Object.freeze({
  name: 'name', 
  gender: 'gender',
  email: 'email'
})

const operation = Object.freeze({
  select: 'select', 
  filterln: 'filterln'
})

let lib = {

    query: function(collection, ...operations){
        let operationsArray = operations;
        let newCollection = collection;

        operationsArray.forEach(op => {
            if(op.name == operation.filterln)
            {
               newCollection = op.action(newCollection);
            }
        })
        
        operationsArray.forEach(op => {
          if(op.name == operation.select)
          {
              newCollection = op.action(newCollection);
          }
        })
        return newCollection;
    },

    select: function( ...fields){

      return {
        name: operation.select,
        action: function(collection){
        let fieldsArray = fields;
        let selected = [];

        collection.forEach(obj => {
          let newObj = {};
          fieldsArray.forEach(field => {
              if(obj.hasOwnProperty(field))
              {
                  newObj[field] = obj[field];
              }
          });
          selected.push(newObj);
       })

       return selected;
      }}},

    filterln: function(field, acceptedValues){

      return{
        name: operation.filterln,

        action: function(collection){
        let filtered = [];

        collection.forEach(obj => {
            if(obj.hasOwnProperty(field))
            {
              acceptedValues.forEach(value => {
                  if(obj[field] === value)
                  {
                      filtered.push(obj);
                  }
              });
            }            
        })

        return filtered;
      }}}
}



let friends = [{
  name: 'Сэм',    
  gender: 'Мужской',    
  email: 'email1@example.com',    
  favoriteFood: 'Картофель'    
},
{  
  name: 'Эмили',    
  gender: 'Женский',    
  email: 'email2@example.com',    
  favoriteFood: 'Яблоко'  
},
{  
  name: 'Кирилл',    
  gender: 'Мужской',    
  email: 'kirill.romashkevich@gmail.com',    
  favoriteFood: 'Чизбургер'  
},
{  
  name: 'Павел',    
  gender: 'Мужской',    
  email: 'kirill.romashkevich@gmail.com',    
  favoriteFood: 'Котлетки'  
},
{  
  name: 'Елена',    
  gender: 'Женский',    
  email: 'elenakirillgrey@mail.ru',    
  favoriteFood: 'Кофе'  
}
];

console.log(lib.query(friends,
          lib.filterln(field.gender, ['Женский']),
          lib.filterln(field.name, ['Елена']),
          lib.select(field.name, field.gender)
          ));

console.log(lib.query(friends,
            lib.select(field.name, field.gender),
            lib.select(field.name, field.email)
          ));
          
console.log(lib.query(friends,
            lib.filterln(field.gender, ['Мужской']),
            lib.select(field.name, field.email)
          ));  

console.log(lib.query(friends,
            lib.filterln(field.gender, ['Мужской']),
            lib.select(field.name, field.email)
          ));   

          

