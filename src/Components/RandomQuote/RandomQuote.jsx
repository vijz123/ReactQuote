import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter (1).png';
import reload_icon from '../Assets/repeat.png';

const RandomQuote = () => {
    const [quote, setQuote] = useState({
        text: "Get the goal",
        author: "John"
    });

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        try {
            const response = await fetch("https://type.fit/api/quotes");
            if (!response.ok) {
                throw new Error('Failed to fetch quotes');
            }
            const data = await response.json();
            const randomQuote = data[Math.floor(Math.random() * data.length)];
            setQuote(randomQuote);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            // Handle error, e.g., show a default quote
        }
    };

    const handleNewQuote = () => {
        fetchQuote();
    };

    const handleTweetQuote = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text}-${quote.author.split(',')[0]}`;
        window.open(twitterUrl);
    };

    return (
        <div id="quote-box" className='container'>
            <div id="text" className="quote">{quote.text}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div id="author" className="author">
                        - {quote.author.split(',')[0]}
                    </div>
                    <div className="icons">
                        <img src={reload_icon} id="new-quote" onClick={handleNewQuote} alt="New Quote" />
                        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote.text}-${quote.author.split(',')[0]}`} target="_blank" rel="noopener noreferrer">
                            <img src={twitter_icon} alt="Tweet Quote" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuote;
