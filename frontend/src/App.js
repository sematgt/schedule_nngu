import React from 'react';
import './Body.css';
import './Footer.css';
import './Header.css';


function App() {
  return (
  <div>  
    <div className="Header">
      <div className="Hat">
        <span role="img" aria-label="Logo">🎓</span>
      </div>
      <div className="Title">
        Расписание
      </div>
      <div className="Today-button">
      <button>Сегодня</button>
      </div>
      <div className="Arrow">
        <button>&#60;</button>
      </div>
      <div className="Arrow">
        <button>&#62;</button>
      </div>
      <div className="Months">
        Октябрь 2019
      </div>
      <div className="Dropdown">
        <button>
          Группа <span>&#9660;</span>
        </button>
      </div>
      <div className="Dropdown">
        <button>
          Неделя <span>&#9660;</span>
        </button>
      </div>
      <div className="Nngu">
        Аф ННГУ им. Н.И. Лобачевского
      </div>
    </div>
    <div className="Schedule-wrapper">
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left">

        </div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left"><span>
        <big>I</big> 8:<small>00</small> - 9:<small>35</small></span>
        </div>
        <div className="Schedule-cell">
        Речевые практики (ПЗ)<br />
        доц. С.В. Зотова<br />
        (ауд.437)
        </div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left"><span>
        <big>II</big> 9:<small>45</small> - 11:<small>20</small></span></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left"><span>
        <big>III</big> 12:<small>00</small> - 13:<small>35</small></span></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left"><span>
        <big>IV</big> 13:<small>45</small> - 15:<small>20</small></span></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row">
        <div className="Schedule-cell" id="left"><span>
        <big>V</big> 15:<small>30</small> - 17:<small>05</small></span></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
      <div className="Schedule-row" id="bottom">
        <div className="Schedule-cell" id="left"><span>
        <big>VI</big> 17:<small>15</small> - 18:<small>50</small></span></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
        <div className="Schedule-cell"></div>
      </div>
    </div>
    <div className="Footer">
      <a href="https://github.com/sgbliznyuk">© 2019 Simon B <span role="img" aria-label="Smile">🧐</span></a>
    </div>
  </div>
  );
}

export default App;
