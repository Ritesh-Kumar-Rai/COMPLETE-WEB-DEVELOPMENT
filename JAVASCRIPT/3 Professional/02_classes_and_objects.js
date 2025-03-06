// Classes and Objects in JS
// In object-oriented programming, a class is an extensible program-code template for creating objects, providing initial values for state (member variables) and implementation of behavior (member functions)

const sleep = async(time)=>{
  return new Promise((resolve)=>{
    setTimeout(resolve,time);
  });
}

class RailwayForm{
  fill(passenger_name, train_number, from,to){
      this.passenger_name = passenger_name;
      this.train_no = train_number;
      this.from = from;
      this.to = to;
  }

  async submit(){
    console.log(`Thank you ${this.passenger_name}, your ticket was confirmed.`);
    
    await sleep(2000);
      console.log(`Passenger Name: ${this.passenger_name}`);
      console.log(`Train no. : ${this.train_no}`);
      console.log(`Departure From : ${this.from}`);
      console.log(`Destination To : ${this.to}`);
  }

  cancel(){
    console.log(`The ${this.passenger_name} has cancelled the ticket from: ${this.from}, to: ${this.to} for train number:${this.train_no}`);
  }
};


(async ()=>{
  const shahrukh = new RailwayForm();
  
  shahrukh.fill("Shahrukh Khan", 12909, "Mumbai", "Mathura");
  console.log(shahrukh.passenger_name);
  await shahrukh.submit();
  shahrukh.cancel();

  // 2nd person
  const salman = new RailwayForm();
  salman.fill("Salman Khan", 12100, "Dwarka", "Mathura");
  console.log(salman.passenger_name);

  salman.cancel();
  await sleep(3000);
  await salman.submit();
  await shahrukh.submit();
})()