// The finally clause
// The try… catch construct may have one more code clause: finally
/*
If it exists it runs in all cases:

 1. after try if there were no errors
 2. after catch if there were errors
 
If there is a return in try, finally is executed just before the control returns to the outer code.
*/

try {
  const a = "Hare Krsna!";
  console.log(a);
} catch (error) {
  console.log("There might be some error!");
}finally{
  console.log("closing system..");
}

function main(){
  try {
    console.log(a);
    return;
  } catch (error) {
    console.log("Error -> a is missing..");
  }finally{
    console.log("Yeh toh chalega hi.");
  }
};

main();