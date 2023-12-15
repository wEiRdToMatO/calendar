const express = require('express');
const app = express();
const port = 5050;
const pgp = require('pg-promise')();

const connectionStr = 'postgresql://postgres:1111@localhost:5432/calendar.db';
const db = pgp(connectionStr);

app.get('/directions', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    try {
        const directions = await db.any('SELECT code, name FROM directions_data;');
        res.json(directions);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/study-forms', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
    try {
      const studyForms = await db.any('SELECT study_form_name FROM study_forms;');
      res.json(studyForms);
    } catch (error) {
      console.error('Error fetching study forms:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/session_dates', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
    try {
      const numOfWeeks = await db.any('SELECT num_of_weeks FROM session_dates;');
      res.json(numOfWeeks);
    } catch (error) {
      console.error('Error fetching number of weeks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/summer_practice_dates', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
    try {
      const numOfWeeks = await db.any('SELECT num_of_weeks FROM summer_practice_dates;');
      res.json(numOfWeeks);
    } catch (error) {
      console.error('Error fetching number of weeks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/vacation_dates', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
    try {
      const numOfWeeks = await db.any('SELECT num_of_weeks FROM vacation_dates;');
      res.json(numOfWeeks);
    } catch (error) {
      console.error('Error fetching number of weeks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/terms', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
    try {
      const numOfTerm = await db.any('SELECT number_of_term FROM term_data;');
      res.json(numOfTerm);
    } catch (error) {
      console.error('Error fetching number of weeks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
