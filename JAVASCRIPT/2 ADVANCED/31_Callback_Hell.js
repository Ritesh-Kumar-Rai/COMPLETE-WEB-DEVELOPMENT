//* ================================
//*  Callback hell
//* ================================

//? Callback hell, also known as the Pyramid of Doom, refers to a situation in asynchronous JavaScript programming where multiple nested callbacks are used to handle asynchronous operations. This often results in code that is difficult to read, understand, and maintain due to its deeply nested structure.

// Callback Hell -> Pyramid of Doom!
const getStudentData = () => {
  setTimeout(() => {
    console.log("Hare Krsna, My name is Ritesh");
    setTimeout(() => {
      console.log("Hare Krsna, My middleName is Kumar");
      setTimeout(() => {
        console.log("Hare Krsna, My lastName is Rai");
        setTimeout(() => {
          console.log("Hare Krsna, I like to code JS");
          setTimeout(() => {
            console.log("Hare Krsna, I live in India");
            setTimeout(() => {
              console.log("Hare Krsna, I was born in Vadodara, India");
              setTimeout(() => {
                console.log("Hare Krsna, I love to chant Hare Krsna.");
                setTimeout(() => {
                  console.log("Hare Krsna! Do chant! ");
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
};

getStudentData();