//add points for getting correct answer
function addPoints(toUnlock) {
  tempPoints = localStorage.getItem('earnedPoints')
  tempPoints = parseInt(tempPoints)
  tempPoints += 10;
  localStorage.setItem('earnedPoints', tempPoints);

  //Unlock input box
  localStorage.setItem(toUnlock, 'true');
}