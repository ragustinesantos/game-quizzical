import React from "react";
import { nanoid } from "nanoid";

export default function Questions(props) {

    const [choices, setChoices] = React.useState([])
    
    // Create a defualt array for choices
    React.useEffect(() => {

        setChoices(props.choices.map(choice => {
            return {...choice, qid: props.id}
        }))

    }, [])  

    // Render button element per multiple choice option
    const choicesButton = choices.map(choice => {

        return <button 
                    className="questions--option"
                    onClick={event => props.handleClick(event, choice, choice.qid, choice.answerId)}
                    style={selectStyle(choice, props.checkAnswer)}
                    disabled={disableButton(props.checkAnswer)}
                >{choice.answer.replace(/&quot;/g,'"').replace(/&#039;/g, "'").replace(/&sup2;/g,"²")}
                </button>

    })

    // Conditionally render chosen answer - selected: true
    function selectStyle(choice, checkAnswer) {

        if (checkAnswer === true) {

            if (choice.result === "correct") {
                return {backgroundColor: '#94D7A2'}
            } else {
                return choice.selected ? {backgroundColor: '#F8BCBC'} : {backgroundColor: '#F5F7FB'}
            }

        } else {

            return {backgroundColor: choice.selected ? '#D6DBF5' : '#F5F7FB'}

        }

    }

    function disableButton(checkAnswer) {
        if (checkAnswer === true) {
            return true
        } else {
            return false
        }
    }

    // Page body
    return (
        
        <div className="questions--container">
            <div className="questions--question">
                {
                    props.question
                        .replace(/&quot;/g,'"')
                        .replace(/&#039;/g, "'")
                        .replace(/&sup2;/g,"²")
                }
            </div>
            <div className="questions--choices">
                {choicesButton}
            </div>
            <hr />
        </div>

    )
}