interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}

interface InputValues {
    arr: Array<number>;
    target: number;
}

const parseArguments2 = (args: Array<string>): InputValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    args = args.slice(2);
    let target = 0;
    const arr: Array<number> = [];
    for (let i = 0; i < args.length; i++) {
        if (isNaN(Number(args[i])))
            throw new Error('input argument type not valid');
        if (i === 0) target = Number(args[i]);
        else {
            arr.push(Number(args[i]));
        }
    }

    return {
        arr,
        target,
    };
};

const calculateExercises = (daily: Array<number>, target: number): Result => {
    const periodLength: number = daily.length;
    const trainingDays: number = daily.reduce(
        (prev: number, curr: number): number => (curr !== 0 ? prev + 1 : prev),
        0
    );
    const average: number =
        daily.reduce((prev: number, curr: number): number => prev + curr, 0) /
        daily.length;

    const success: boolean = average >= target;

    const rating: 1 | 2 | 3 = success ? 3 : average >= target / 2 ? 2 : 1;

    let ratingDescription: string;
    if (rating === 3) ratingDescription = 'well done!';
    else if (rating === 2)
        ratingDescription = 'not too bad but could be better';
    else ratingDescription = 'try again next week!';

    return {
        periodLength,
        trainingDays,
        average,
        success,
        rating,
        ratingDescription,
        target,
    };
};

try {
    const { arr, target } = parseArguments2(process.argv);
    console.log(calculateExercises(arr, target));
} catch (error: unknown) {
    let errorMessage = 'Something went bad';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;
