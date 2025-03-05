// OOP in JS Object

const player = {
  player_name: "G.ONE",
  health: 80,
  player_online_id: Math.random() * 1200,
  fight: function(){
    console.log(`${this.player_name} is fighting with a health: ${this.health - Math.round((Math.random() * 10) +1)}`);
  },
  run: function(){
    console.log(`${this.player_name} is running`);
  },
  profileInfo: function(){
    console.log(`player name: ${this.player_name}`);
    console.log(`player health: ${this.health}`);
    console.log(`player online id: ${this.player_online_id}`);
  }
};

// const player1 = player;
// console.log(player1.player_name);
// player1.fight();
// player1.run();
// player1.fight();
// player1.fight();
// // player1.fight();
// player1.run();

// player1.profileInfo();

// let's create a constructor function
function playerClass(player_name){
  this.playerName = player_name;
  this.playerHealth = 100;
  this.playerOnlineID = (this.playerName.length + Math.random() * 567833);

  this.run = function(){
    console.log(`${this.playerName} is running...`);
  }

  this.fight = function(){
    const destructionLevel = Math.round(Math.random() * 10) + 1;
    console.log(`${this.playerName} is fighting with a health: ${this.playerHealth = this.playerHealth - destructionLevel}`);
    console.log("Destruction Level is:",destructionLevel);
  }

  this.setUserProfile = function(name){
      this.playerName = name;
  }

  this.getUserProfile = function(){
    console.log(`Player Name: ${this.playerName}`);
    console.log(`Player Health: ${this.playerHealth}`);
    console.log(`Player Online ID: ${this.playerOnlineID}`);
  }

  return this;
};

const player1 = new playerClass("Krrish");
console.log(player1.playerName);
player1.fight();
player1.run();
player1.getUserProfile();
console.log('-------------------')
player1.setUserProfile("G.ONE");
console.log(player1.playerName);
player1.fight();
player1.getUserProfile();
console.log('---------------------');
const player2 = new playerClass("Shaktimaan");

player2.getUserProfile();

console.log(player1.playerName);
console.log(player1.playerHealth);