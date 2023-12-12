import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className='container'>
      <header><h1>Учебный календарь</h1></header>
        <div className='sidenav'>
          <div className='form-education'>
            <p>Форма обучения:</p>
            <input type='radio' id='full-time' name='form' value='full-time' />
              <label for='full-time'>Очная</label><br />
            <input type='radio' id='part-time' name='form' value='part-time' />
              <label for='part-time'>Очно-заочная</label><br />
            <input type='radio' id='correspondence' name='form' value='correspondence' />
              <label for='correspondence'>Заочная</label><br />
          </div>
          <div className='num-course'>
            <p>Курс:</p>

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
    </div>
  );
}

export default App;