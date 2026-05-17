const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-client');
const app = express();

app.use(cors());
app.use(express.json());

const SUPABASE_URL = 'https://eldpojhzopiyantidjra.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZHBvamh6b3BpeWFudGlkanJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTAzNTEsImV4cCI6MjA5NDYyNjM1MX0.Q_FqrCry3wDeZtubCk8LV-GwwmESi-LlruaC1ulad8A';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.post('/save-art-grade', async (req, res) => {
    try {
        const { name, s_class, participation, creativity, technique, reflection } = req.body;
        const total = Number(participation) + Number(creativity) + Number(technique) + Number(reflection);

        const { data, error } = await supabase
            .from('art_grades')
            .insert([{ 
                student_name: name, 
                class_name: s_class, 
                participation_score: Number(participation), 
                creativity_score: Number(creativity), 
                technique_score: Number(technique), 
                reflection_score: Number(reflection),
                total_score: total
            }]);

        if (error) throw error;
        res.json({ status: 'success', message: 'ውጤቱ ተመዝግቧል!' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running...'));
