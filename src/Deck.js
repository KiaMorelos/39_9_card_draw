import { useState, useEffect } from 'react';
import axios from "axios";
import Card from './Card';

const CARDS_API_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawnCard, setDrawnCard] = useState(null);

    useEffect(() => {
        async function fetchDeck() {
            const deckRes = await axios.get(`${CARDS_API_URL}/new/shuffle/`);
            setDeck(deckRes.data);
        }
        fetchDeck();
    }, [setDeck]);

const handleClick = async () => {
    try{
        const {data} = await axios.get(`${CARDS_API_URL}/${deck.deck_id}/draw`);

        console.log(data)
        const {cards} = data
        
        if(data.remaining === 0){
            throw new Error("no cards remaining!");
        }

    setDrawnCard(cards[0]);
    } catch (err){
        alert(err)
    } 
}

// useEffect(() => {     
//     async function drawCard(){
//         const cardRes = await axios.get(`${CARDS_API_URL}/${deck.deck_id}/draw`)
//         setDrawnCard(cardRes.data)
//     }
//     drawCard();
// }, [setDrawnCard]);






    return (
        <div>
            {deck ? (<button onClick={handleClick}>DRAW CARD!</button>) : (<h1>loading deck ... </h1>)}
        
        {drawnCard && (
            <Card image={drawnCard.image} />
        )}
        </div>
    )
}

export default Deck;