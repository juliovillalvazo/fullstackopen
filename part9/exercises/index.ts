import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const args = req.query;
        if (Object.keys(args).length > 2) throw new Error('too many arguments');
        if (isNaN(Number(args.height)) || isNaN(Number(args.weight)))
            throw new Error('malformatted parameters');

        const { height, weight } = args;

        const bmi = calculateBmi(Number(height), Number(weight));
        res.json({ height, weight, bmi });
    } catch (error: unknown) {
        const errorMessage = 'malformatted parameters';
        res.status(400).json({ error: errorMessage });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target)
        return res.status(400).json({ error: 'parameters missing' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (isNaN(Number(daily_exercises[i])))
            return res.status(400).json({ error: 'malformatted parameters' });
    }

    if (isNaN(Number(target)))
        return res.status(400).json({ error: 'malformatted parameters' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const calc = calculateExercises(daily_exercises, Number(target));

    return res.status(200).json({ ...calc });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
