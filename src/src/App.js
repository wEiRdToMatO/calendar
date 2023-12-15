import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [selectedTerm, setSelectedTerm] = useState('1'); // По умолчанию выбран первый семестр
  const [selectedDirection, setSelectedDirection] = useState('09.03.03');
  const [directions, setDirections] = useState([]);
  const [studyForms, setStudyForms] = useState([]);
  const [numOfSession, setNumOfSession] = useState(undefined);
  const [numOfPractice, setNumOfPractice] = useState(undefined);
  const [numOfVacation, setNumOfVacation] = useState(undefined);
  const [term, setTerm] = useState([]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    fetchStudyForms();
    fetchTerm();
    fetchDirections();
  }, []);

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
    .then(response => {
      return response.json();
    })
    .then(json => {
      setNumOfSession(json[0].num_of_weeks);
    });

    alert(numOfSession);
  };

  const fetchNumOfPractice = () => {
    fetch('http://localhost:5050/summer_practice_dates')
    .then(response => {
      return response.json();
    })
    .then(json => {
      setNumOfPractice(json[0].num_of_weeks);
    });

    alert(numOfPractice);
  };

  const fetchNumOfVacation = () => {
    fetch('http://localhost:5050/vacation_dates')
    .then(response => {
      return response.json();
    })
    .then(json => {
      setNumOfVacation(json[0].num_of_weeks);
    });

    alert(numOfVacation);
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
        </div>
      <div className="calendar-container">
        <p>Выбранная дата: {/*date.toLocaleDateString()*/}</p>
          <Calendar
            onChange={onChange}
            value={date}
            minDetail='year'м
            selectRange={true}
          />
      </div>  

      <button onClick={fetchNumOfSession}>
        <span>fetch session</span>
      </button>
    </div>
  );
}

export default App;