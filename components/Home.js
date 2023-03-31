import React from "react";

export default function Home(props) {

    const [filter, setFilter] = React.useState({
        category: "",
        difficulty: ""
    })

    function handleChange(event) {

        const {name, value} = event.target
        setFilter(prevFilter => {
            return {
                ...prevFilter,
                [name]: value
            }
        })

    }

    function toggleClick() {

        props.toggleNewGame()

    }

    return (

        <div className="home--container">
            <div className="home--info">
                <h1 className="home--title">Quizzical</h1>
                <h4 className="home--description">Test out your knowlegde by answering trivias!</h4>
            </div>
            <div className="filter">
                <select 
                    id="category"
                    className="filter--select"
                    value={filter.category}
                    onChange={handleChange}
                    name="category"
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
                <select 
                    id="difficulty"
                    value={filter.difficulty}
                    onChange={handleChange}
                    name="difficulty"
                    className="filter--select"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button className="home--startButton" onClick={toggleClick}>Start Quiz!</button>
        </div>

    )
}