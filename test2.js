function testFailure() {
    if (1 === 2) {
      console.log("Le test a réussi !");
    } else {
      throw new Error("Le test a échoué : 1 n'est pas égal à 2");
    }
  }
  
  testFailure();
  