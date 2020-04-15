// Try edit message
export default function getFreeScheduleSlotsArray(studyMode, days, lessons, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime) {
  var res = days.map(d => d)
  for (let day of res) {
    
    // add classes to an array

    day.classes_count = '';
    day.classes=[]
    for (let i of [1,2,3,4,5,6]) {
      day.classes.push(
  			{
  				'number': `${i}`,
  				'lesson': false,
  				'speaker_is_free': true,
  				'classroom_is_free': true,
  				'class_in_streak': null,
  			}
      );
    }
  }

  // handle "lesson" and "class_in_streak" properties
  for (let day of res) {
    if (studyMode === "distance") {
      for (let l of lessons) {
        for (let c in day.classes) {
          if (l.date_day === day.date && l.class_number === day.classes[c].number) 
          {
            day.classes[c].lesson = true;
            try {day.classes[parseInt(c)+1].class_in_streak = true} catch(e) {};
            try {day.classes[parseInt(c)-1].class_in_streak = true} catch(e) {};
            for (let i = 1; i <=6; i++) {
              if (day.classes[parseInt(c)+1].lesson !== true) {
                try {day.classes[i].class_in_streak = false} catch(e) {};
              }
            }
          }
        }
      }
    }
    if (studyMode === "fulltime") {
      for (let l of lessons) {
        for (let c in day.classes) {
          if (l.week_parity === selectedWeekParity && l.day === day.wday_en && l.class_number === day.classes[c].number)
          {
            day.classes[c].lesson = true;
            try {day.classes[parseInt(c)+1].class_in_streak = true} catch(e) {};
            try {day.classes[parseInt(c)-1].class_in_streak = true} catch(e) {};
            for (let i = parseInt(c)+2; i <=6; i++) {
              if (day.classes[parseInt(c)+1].lesson !== true) {
                try {day.classes[i].class_in_streak = false} catch(e) {};
              }
            }
          }
        }
      }
    }

    // handle "classes_count"

      var i = 0;
      for (let c of day.classes) {
        c.lesson === true && i++;
      }
      day.classes_count = i;
      i = 0;

    // handle "speaker_is_free" 

      /*check speaker's distance classes*/
      if (studyMode === "distance") {
        for (let c of speakerClassesDistance) {
          if (c.date_day === day.date) {
            for (let cl of day.classes) {
              if (c.class_number === cl.number) cl.speaker_is_free = false
            }
          }
        }
      }
      /*check speaker's fulltime classes*/
  for (let c of speakerClassesFulltime) {
    if (c.day === day.wday_en && c.week_parity === selectedWeekParity) {
      for (let cl of day.classes) {
        if (c.class_number === cl.number) cl.speaker_is_free = false
      }
    }
  }
      /*check speaker's blocked class spots*/
      if (studyMode === "distance") {
  for (let s of speakerBlockedSlotsDistance) {
    if (s.date_day === day.date) {
      for (let cl of day.classes) {
        if (s.class_number.toString() === cl.number) cl.speaker_is_free = false
      }
    }
  }
}

  for (let s of speakerBlockedSlotsFulltime) {
    if (s.day === day.wday_en && s.week_parity === selectedWeekParity) {
      for (let cl of day.classes) {
        if (s.class_number.toString() === cl.number) cl.speaker_is_free = false
      }
    }
  }

  }
  return res
}