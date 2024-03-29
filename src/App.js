import { useState } from 'react';
import './App.css';
import WordService from './word.service';

const defaultData = {
  word: '',
  definition: '',
  isPalindrome: '',
  isAlmostPalindrome: '',
  points: ''
}
function App() {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState(defaultData);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(){
    try{
      const data = await WordService.submitWord(word);
      if(data){
        setWordData(data);
        setErrorMessage('');
      }
    }catch(err){
      setErrorMessage(err.response.data.message);
      setWordData(defaultData);
    }
  }

  return (
    <div>
      <h1 id='title'>Word Game</h1>
      <p id='rules' className='mt-3 mb-3'>Rules: type a word in the input field, depending on the word you will get a certain amount of points for it. 1 point for each unique
        letter in the word, 3 extra points if that word is a palindrome and 2 extra points if that word is almost a palindrome (meaning that if one letter is
        removed from it, it becomes a true palindrome)
      </p>
      <div className="input-group mb-3 mt-3">
        <button className="btn btn-outline-secondary" type="button" onClick={handleSubmit}>Submit</button>
        <input type="text" className="form-control" placeholder="Enter a word..." onChange={(e)=>setWord(e.target.value)}/>
      </div>
      {wordData.word && <div className="alert alert-info" role="alert">
          <ul>
            <li>Word: {wordData.word.word}</li>
            <li>Definition: {wordData.word.definition}</li>
            <li>Number of Unique Letters: {wordData.numberOfUniqueLetters}</li>
            <li>Palindrome: {wordData.isPalindrome ? 'Yes' : 'No'}</li>
            <li>Almost a Palindrome: {wordData.isAlmostPalindrome ? 'Yes' : 'No'}</li>
            <li>Points: {wordData.points}</li>
          </ul>
      </div>}
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
    </div>
  );
}

export default App;
