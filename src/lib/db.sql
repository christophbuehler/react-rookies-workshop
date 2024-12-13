-- Survey table
CREATE TABLE
  survey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER,
    title TEXT
  );

-- Survey question table
CREATE TABLE
  survey_question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id INTEGER NOT NULL,
    title TEXT,
    question_order INTEGER,
    FOREIGN KEY (survey_id) REFERENCES survey (id)
  );

-- Survey response table
CREATE TABLE
  survey_response (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT
  );

-- Survey question response table
CREATE TABLE
  survey_question_response (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_question_id INTEGER NOT NULL,
    survey_response_id INTEGER NOT NULL,
    timestamp TEXT,
    response TEXT,
    FOREIGN KEY (survey_question_id) REFERENCES survey_question (id),
    FOREIGN KEY (survey_response_id) REFERENCES survey_response (id)
  );