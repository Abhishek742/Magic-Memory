import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
function App() {
  const cardImages = [
    { 'src' : '/img/helmet-1.png', matched:false },
    { 'src' : '/img/potion-1.png', matched:false },
    { 'src' : '/img/ring-1.png', matched:false },
    { 'src' : '/img/scroll-1.png', matched:false },
    { 'src' : '/img/shield-1.png', matched:false },
    { 'src' : '/img/sword-1.png', matched:false },
  ];

  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);
  const [disabled,setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    const shuffledCards = [...cardImages,...cardImages]
    .sort( () => Math.random() - 0.5 )
    .map((card) => ({...card , id : Math.random()}));
    setCards(shuffledCards);
    setTurns(0);
  }

  //handle a choice
  const [choiceOne,setChoiceOne] = useState();
  const [choiceTwo,setChoiceTwo] = useState();

  const handleChoice = (card) =>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card);
  }
  //start game automatically
  useEffect(()=>{
    shuffleCards();
  },[])
  //compare two selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo  && choiceOne.id != choiceTwo.id){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards( prevCard => {
          return(
            prevCard.map( (card) => {
              if(card.src === choiceOne.src){
                card.matched = true;
              }
              return card;
            })
          )
        });
        resetTurns();
      }else{
        setTimeout( () => resetTurns(), 1000);
      }
    } 
  },[choiceOne,choiceTwo]);

  const resetTurns = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false);
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice} 
              flipped = {card === choiceOne || card === choiceTwo || card.matched}
              disabled = {disabled}
            />
          ))
        }
      </div>
      <h3 className='turns'>Turns : {turns}</h3>
    </div>
  );
}

export default App;
