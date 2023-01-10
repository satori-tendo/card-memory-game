import React, { useEffect, useState } from 'react'
import s from './Game.module.scss'

const Game = () => {

    const [cardsNumber, setCardsNumber] = useState(64);
    const cardsArray = [];
    for (let i = 1; i <= cardsNumber; i++) {
        cardsArray.push(i)
    }

    const [gameStatus, setGameStatus] = useState('finished') // Статус игры
    const [numbOfCorrectCards, setNumbCorrectCard] = useState(5) // Кол-во правильных карточек
    const [arrCorrectCards, setArrCorrectCards] = useState([]) // Массив номеров правильных карточек
    const [numbOfRightGuessCards, setNumbOfRightGuessCards] = useState(0); // Кол-во правильно угаданных чисел
    const [isVictory, setIsVictory] = useState(false);
    const [launchApp, setLaunchApp] = useState(true);
    const [correctCardClassName, setCorrectCardClassName] = useState(s.correctCard)
    const [disabled, setDisabled] = useState(true)

    const gameStart = () => {
        setLaunchApp(false)
        setGameStatus('started')
        const copyArr = [];
        for(let i = 1; i <= numbOfCorrectCards; i++) {
            copyArr.push(arrayRandomElement(cardsArray))
        }
        setArrCorrectCards(copyArr)
        changeClassName()
    }
    const checkCard = (card) => {
        const guessedCard = arrCorrectCards.includes(card)
        if(numbOfRightGuessCards >= numbOfCorrectCards - 1) {
            setGameStatus('finished')
            setIsVictory(true)
        }
        if(guessedCard) {
            setNumbOfRightGuessCards(numbOfRightGuessCards + 1)
        } else {
            setGameStatus('finished')
            setIsVictory(false)
        }
    } 
    let arrayRandomElement = (arr) => { //получение рандомного элемента массива
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    const restartClick = () => {
        setNumbOfRightGuessCards(0);
        setCorrectCardClassName(s.correctCard)
        setDisabled(true)
        gameStart()
    }

    const changeClassName = () => {
        setTimeout(() => {
            setCorrectCardClassName(s.card)
            setDisabled(false)
        },
        2000)
    }
    

    return (
        <div className={s.game}>
            {launchApp &&
            <button className={s.start} onClick={gameStart}>START</button>}
            {!launchApp && gameStatus == 'finished' && isVictory == true &&
            <div className={s.result}>
                <span className={s.resultSpan}>типа ты выиграл</span>
                <button className={s.restart} onClick={restartClick}>RESTART</button>
            </div>}
            {!launchApp && gameStatus == 'finished' && isVictory == false && 
            <div className={s.result}>
                <span className={s.resultSpan}>типа ты проиграл</span>
                <button className={s.restart}  onClick={restartClick}>RESTART</button>
            </div>}
            <div className={s.gameContainer}>
                {cardsArray.map((card) => {
                    return <button className={arrCorrectCards.includes(card) ? correctCardClassName : s.card} 
                        disabled={disabled}
                        key={card} onClick={() => checkCard(card)}></button>
                        // todo: вынести кнопку в компонент
                })}
            </div>
        </div>
    )
}

export default Game;