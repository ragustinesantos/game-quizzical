import React from "react";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import "../src/index.css"

export default function Quizzical(props) {
    
    // State
    const [questions, setQuestions] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [correct, setCorrect] = React.useState([])
    const [answerCount, setAnswerCount] = React.useState(0)
    const [correctCount, setCorrectCount] = React.useState(0)
    const [checkAnswer, setCheckAnswer] = React.useState(false)
    const category = props.filter.category
    const difficulty = props.filter.difficulty

    // Use effect for setting state to default
    React.useEffect(() => {

        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => data.results)
        .then(question => setQuestions(question.map(item => {
                return {
                    question: item.question,
                    questionId: nanoid(),
                    choices: sequencer([
                        {answer: item.correct_answer, result: "correct", answerId: nanoid(), selected: false}, 
                        {answer: item.incorrect_answers[0], result: "incorrect", answerId: nanoid(), selected: false}, 
                        {answer: item.incorrect_answers[1], result: "incorrect", answerId: nanoid(), selected: false}, 
                        {answer: item.incorrect_answers[2], result: "incorrect", answerId: nanoid(), selected: false}]),
                    answered: false,
            }})))

        setCorrect([])

        setAnswers([])

        setAnswerCount(0)
        
        setCorrectCount(0)

    },[props.gameStart])

    function sequencer(choices) {
        for (var i = choices.length - 1; i != 0; i--) {
            const j = Math.floor(Math.random()*(i + 1))
            const sub = choices[i]
            choices[i] = choices[j]
            choices[j] = sub
        }
        return choices
        }

    // onClick function to be executed when an answer is submitted
    function handleClick(event, choice, questionId, answerId) {

        updateQuestions(questionId, answerId)

        updateAnswers(choice)
        
        updateCorrect(choice)

    }

    // function for setting new questions state to continuously note which question is answered and which answer is selected
    function updateQuestions(questionId, answerId) {

        const mappedQuestions = questions.map(question => {
            return question.questionId === questionId
            ? {...question, choices: updateChoices(question.choices, answerId), answered: true}
            : question
        })

        setQuestions(mappedQuestions)
    }
    
    // function for returning an updated mapped array of choices of the answered question where the answer chosen is toggled to selected and the others deselected
    function updateChoices(choices, answerId) {

        const mappedChoices = choices.map(answer => {

            return answer.answerId === answerId 
            ? {...answer, selected: true}
            : {...answer, selected: false}

        })

        return mappedChoices
    }

    // function for updating the answers chosen for each question
    function updateAnswers(choice) {

        const answerId = answers.map(answer => {
            return answer.qid
        })

        if (answerId.includes(choice.qid) === true) {

            const revisedAnswer = answers.map(answer => {
                return choice.qid === answer.qid ? choice : answer
            })

            setAnswers(revisedAnswer)

        } else {

            setAnswers(prevAnswers => {
                return [...prevAnswers, choice]
            })

            setAnswerCount(prevCount => prevCount + 1)
        }
    }

    // function that stores a correct answer and removes it if the user changes his answer to an incorrect one
    function updateCorrect(choice) {

        const correctId = correct.map(correctAnswer => {
            return correctAnswer.qid
        })

        if (choice.result === "correct") {

            if (correctId.includes(choice.qid) === true) {

                const revisedCorrect = correct.map(correctAnswer => {
                    return choice.qid === correctAnswer.qid ? choice : correctAnswer
                })

                setCorrect(revisedCorrect)

            } else {

                setCorrect(prevCorrect => {
                    return [...prevCorrect, choice]
                })

                setCorrectCount(prevCount => prevCount + 1)
            }

        } else {

            if (correctId.includes(choice.qid) === true) {

                const removedIncorrect = correct.filter(correct => correct.qid != choice.qid)

                setCorrect(removedIncorrect)

                setCorrectCount(prevCount => prevCount - 1)

            }

        }
    }

    // function that toggles whether the quiz has been checked or not
    function toggleCheck() {

        if (checkAnswer === false) {

            setCheckAnswer(prevCheck => !prevCheck)

        } else {

            setCheckAnswer(prevCheck => !prevCheck)

            props.toggleGameStart()
        }
        
    }

    // a function that displays the Play again text and the number of correct answers if true
    function correctStyle() {

        if (checkAnswer === true) {

            return {display: 'block'}

        } else {

            return {display: 'none'}

        }

    }

    // Mapping of questions from API to the Questions component
    const mappedQuestions = questions.map(question => 
        <Questions
            key={nanoid()}
            questionSet={question}
            id={question.questionId}
            question={question.question}
            choices={question.choices}
            answered={question.answered}
            handleClick={handleClick}
            checkAnswer={checkAnswer}
        />)
    

    // Page body
    return(
        <div className="quiz--container">
            <div className="quiz--questions">
                {mappedQuestions}
            </div>
            <div className="quiz--buttonContainer">
                <div className="quiz--correctAnswer" style={correctStyle()}>You scored {correctCount}/5 correct answers!</div>
                <button className="quiz--checkAnswer" onClick={toggleCheck}>{checkAnswer ? "Play Again" : "Check Answers"}</button>
            </div>
        </div>
    )
}