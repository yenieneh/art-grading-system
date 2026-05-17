const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-client');
const app = express();

app.use(cors());
app.use(express.json());

// 🔗 የSupabase ኦንላይን ዳታቤዝ ግንኙነት
// መስመር 11 እና 12 ላይ ያንተን እውነተኛ መረጃዎች ተካባቸው
const SUPABASE_URL = 'https://eldpojhzopiyantidjra.supabase.co';
const SUPABASE_KEY = 'ከቴሌግራም_ያመጣኸው_ረጅሙ_የአኖን_ኪይ_እዚህ_ይግባ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.post('/save-art-grade', async (req, res) => {
    const { name, s_class, participation, creativity, technique, reflection } = req.body;
    const total = Number(participation) + Number(creativity) + Number(technique) + Number(reflection);

    const { data, error } = await supabase
        .from('art_grades')
        .insert([{ 
            student_name: name, 
            class_name: s_class, 
            participation_score: participation, 
            creativity_score: creativity, 
            technique_score: technique, 
            reflection_score: reflection,
            total_score: total
        }]);

    if (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
    res.json({ status: 'success', message: 'ውጤቱ በኦንላይን ዳታቤዝ ላይ ተቀምጧል!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ሰርቨሩ እየሰራ ነው!`));

