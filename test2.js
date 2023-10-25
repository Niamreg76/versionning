function testAddition() {
    const result = 1 + 2;
    if (result === 3) {
      console.log("Le test d'addition a réussi !");
    } else {
      throw new Error("Le test d'addition a échoué");
    }
  }
  
  testAddition();
  