import { useState } from 'react';
import './App.css';

function App() {

  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'CARD 3'},
    {id: 2, order: 1, text: 'CARD 1'},
    {id: 3, order: 2, text: 'CARD 2'},
    {id: 4, order: 4, text: 'CARD 4'},
  ])

  const [currentCard, setCurrentCard] = useState(null)


  const dragStartHandler = (e, card) =>{
    console.log('drag',card)
    setCurrentCard(card)
  }
  const dragLeaveHandler = (e) =>{
    console.log('Leave')
    e.target.style.background = 'white'
  }
  const dragEndHandler = (e) =>{
    console.log('END')
    // e.target.style.background = 'white'

  }
  const dragOverHandler = (e) =>{
    console.log('Over')
    e.preventDefault();
    e.target.style.background = 'lightgray'
  }
  const dropHandler = (e, card) =>{
    e.preventDefault()
    console.log('drop',card)

    setCardList(cardList.map(c=>{
      if (c.id === card.id){
        return {...c, order: currentCard.order}
      }
      if (c.id === currentCard.id){
        return {...c, order: card.order}
      }

      return c
    }))
    e.target.style.background = 'white'

  }

  const sortCards = (a, b) =>{
      if (a.order > b.order){
        return 1
      } else return -1
  }

  return (
    <div className="App">
        {cardList.sort(sortCards).map(card=>
          <div 
            key = {card.id}
            onDragStart={(e)=> dragStartHandler(e, card)}
            onDragLeave={(e)=> dragLeaveHandler(e)}
            onDragEnd={(e)=> dragEndHandler(e)}
            onDragOver={(e)=> dragOverHandler(e)}
            onDrop={(e)=> dropHandler(e, card)}
            draggable={true}
            className='card'
          >
            {card.text}
          </div>
        )}
    </div>
  );
}

export default App;
