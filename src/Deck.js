import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Card from './Card';

const CARDS_API_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawnCard, setDrawnCard] = useState(null);
    const [autoDraw, setAutoDraw] = useState(false);
    const timer = useRef(null);


    useEffect(() => {
        async function fetchDeck() {
            const deckRes = await axios.get(`${CARDS_API_URL}/new/shuffle/`);
            setDeck(deckRes.data);
        }
        fetchDeck();
    }, [setDeck]);

// const handleClick = async () => {
//     try{
//         const {data} = await axios.get(`${CARDS_API_URL}/${deck.deck_id}/draw`);

//         const {cards} = data
//         if(data.remaining === 0){
//             throw new Error("no cards remaining!");
//         }

//     setDrawnCard(cards[0]);
//     } catch (err){
//         alert(err)
//     } 
// }

useEffect(() => {     
    async function drawCard(){
        try{
            const {data} = await axios.get(`${CARDS_API_URL}/${deck.deck_id}/draw`);
            const {cards} = data
            
            if(data.remaining === 0){
                setAutoDraw(false)
                throw new Error("no cards remaining!");
            }
            
            setDrawnCard(cards[0]);
            } catch (err){
            alert(err)
        } 
    }

    if (autoDraw && !timer.current) {
        timer.current = setInterval(async () => {
          await drawCard();
        }, 1000);
      }
  
      return () => {
        clearInterval(timer.current);
        timer.current = null;
      };
}, [setDrawnCard, autoDraw, setAutoDraw, deck]);



const toggleAutoDraw = () => {
    setAutoDraw(draw => !draw);
  };

    return (
        <div>
            {deck ? (<button onClick={toggleAutoDraw}>{autoDraw ? "Stop" : "Start"} drawing automatically </button>) : (<h1>loading deck ... </h1>)}
        
        {drawnCard && (
            <Card image={drawnCard.image} />
        )}
        </div>
    )
}

export default Deck;