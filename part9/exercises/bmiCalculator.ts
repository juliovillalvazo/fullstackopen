// interface BmiValues {
//     height: number;
//     weight: number;
// }

// const parseArguments = (args: Array<string>): BmiValues => {
//     if (args.length < 4) throw new Error('not enough arguments');
//     if (args.length > 4) throw new Error('too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3]),
//         };
//     }

//     throw new Error('input is not a number!');
// };

const calculateBmi = (height: number, weight: number): string => {
    height = height / 100;
    const bmi: number = weight / height ** 2;

    if (bmi < 18.6) return `Bad (underweight)`;
    if (bmi > 18.5 && bmi < 25) return `Normal (healthy weight)`;
    if (bmi >= 25 && bmi <= 29.9) return 'Bad (overweight)';
    else return 'bad (obesity)';
};

// try {
//     const { height, weight } = parseArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

export default calculateBmi;
