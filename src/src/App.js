import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [selectedTerm, setSelectedTerm] = useState('1'); // По умолчанию выбран первый семестр
  const [selectedDirection, setSelectedDirection] = useState('09.03.03');
  const [selectedOption, setSelectedOption] = useState('session');
  const [directions, setDirections] = useState([]);
  const [studyForms, setStudyForms] = useState([]);
  const [numOfSession, setNumOfSession] = useState(undefined);
  const [numOfPractice, setNumOfPractice] = useState([]);
  const [numOfVacation, setNumOfVacation] = useState([]);
  const [term, setTerm] = useState([]);
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionEnd, setSessionEnd] = useState(null);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const fetchDirections = () => {
    fetch('http://localhost:5050/directions')
      .then(response => response.json())
      .then(data => setDirections(data.map(direction => direction.code)))
      .catch(error => console.error('Error fetching directions:', error));
  };

  const fetchStudyForms = () => {
    fetch('http://localhost:5050/study-forms')
      .then(response => response.json())
      .then(data => setStudyForms(data))
      .catch(error => console.error('Error fetching study forms:', error));
  };

  const fetchNumOfSession = () => {
    fetch('http://localhost:5050/session_dates')
    .then(response => response.json())
    .then(data => setNumOfSession(data))
    .catch(error => console.error('Error fetching summer practice dates:', error));
  };

  const calculationOfSessionDates = (numOfSession) => {
    const isSunday = (date) => date.getDay() === 0;
  
    let startDate = new Date(new Date().getFullYear(), 8, 1);
  
    while (!isSunday(startDate)) {
      startDate.setDate(startDate.getDate() + 1);
    }
  
    let startSessionDate = new Date(startDate);
    startSessionDate.setDate(startSessionDate.getDate() + numOfSession * 7);
  
    let endSessionDate = new Date(startSessionDate);
    endSessionDate.setDate(endSessionDate.getDate() + numOfSession * 7);
  
    return {
      startSessionDate,
      endSessionDate,
    };
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (date >= sessionStart && date <= sessionEnd) {
        return 'session-range';
      }
    }
    return null;
  };

  const fetchNumOfPractice = () => {
    fetch('http://localhost:5050/summer_practice_dates')
      .then(response => response.json())
      .then(data => setNumOfPractice(data))
      .catch(error => console.error('Error fetching summer practice dates:', error));
  };

  const fetchNumOfVacation = () => {
    fetch('http://localhost:5050/vacation_dates')
      .then(response => response.json())
      .then(data => setNumOfVacation(data))
      .catch(error => console.error('Error fetching summer vacation dates:', error));
  };

  const fetchTerm = () => {
    fetch('http://localhost:5050/terms')
      .then(response => response.json())
      .then(data => setTerm(data.map(term => term.number_of_term)))
      .catch(error => console.error('Error fetching courses:', error));
  };

  const onTermChange = (event) => {
    setSelectedTerm(event.target.value);
    fetchTerm();
  };

  const onDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
    fetchDirections();
  };

  const onOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchData = () => {
    switch (selectedOption) {
      case 'session':
        fetchNumOfSession();
        break;
      case 'practice':
        fetchNumOfPractice();
        break;
      case 'vacation':
        fetchNumOfVacation();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchStudyForms();
    fetchTerm();
    fetchDirections();
    fetchData();
  }, [selectedOption]);
  
  

  return (
    <div className='container'>
      <header><h1>Учебный календарь</h1></header>
        <div className='sidenav'>
          <div className='form-education'>
            <p>Форма обучения:</p>
            {studyForms.map((form) => (
              <div key={form.study_form_name}>
                <input type='radio' id={form.study_form_name} name='form' value={form.study_form_name} />
                <label htmlFor={form.study_form_name}>{form.study_form_name}</label><br />
          </div>
        ))}
          </div>
          <div className='num-course'>
            <p>Семестр:</p>
              <select value={selectedTerm} onChange={onTermChange}>
                {term.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
          </div>
          <div className='direction-code'>
            <p>Код направления:</p>
            <select value={selectedDirection} onChange={onDirectionChange}>
              {directions.map((direction) => (
                <option key={direction} value={direction}>
                  {direction}
                </option>
              ))}
            </select>
          </div>
          <div className='option'>
            <p>Что показать?</p>
            <select value={selectedOption} onChange={onOptionChange}>
              <option value='session'>Сессия</option>
              <option value='practice'>Летние практики</option>
              <option value='vacation'>Каникулы</option>
            </select>
          </div>
          <div className='button-container'>
            <button onClick={fetchData}>
              <span>Показать</span>
            </button>
          </div>
        </div>
      <div className="calendar-container">
        <p>Выбранная дата: {/*date.toLocaleDateString()*/}</p>
          <Calendar
            onChange={onChange}
            value={date}
            minDetail='year'м
            selectRange={true}
            tileClassName={tileClassName}
          />
      </div>  

    </div>
  );
}

export default App;