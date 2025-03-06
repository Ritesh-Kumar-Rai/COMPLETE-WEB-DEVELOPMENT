// The constructor method:
// The constructor() method is called automatically by new, so we can initialize the object there

class Player{

  constructor(name = "anonymous"){
    this.playerName = name;
    console.log("Player is created!");
  }
  // constructor is called only once when object [instance] is created

  medidate(){
    console.log(`${this.playerName} is meditating...`);
  }

  walk(){
    console.log(`${this.playerName} is started walking...`);
  }

  run(){
    console.log(`${this.playerName} is started running...`);
  }

  fight(){
    console.log(`${this.playerName} is started fighting...`);
  }

  setPlayerName(name){
    if(!name || (typeof(name) === "string" && name.length < 3) || typeof(name) !== "string"){
      throw new TypeError("name is required or not less than 3 character!");
    }
    const oldName = this.playerName;
    this.playerName = name;
    console.log(`player name is updated from ${oldName} to ${this.playerName}`);
  }
}

try {
  
  const g_one = new Player("G.ONE");
  g_one.medidate();
  g_one.walk();
  g_one.fight();
  g_one.run();

  g_one.setPlayerName("Ram");
  g_one.walk();

  console.log("-------------------");
  const shaktiman = new Player("Shaktimaan");
  shaktiman.medidate();

} catch (error) {
  console.log(`${error.name} -> ${error.message}`);
}