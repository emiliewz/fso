"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    const newEntry = {
        name: "Martin Riggs",
        dateOfBirth: "1979-01-30",
        ssn: "300179-77A",
        gender: "male",
        occupation: "Cop"
    };
    return newEntry;
};
exports.default = toNewPatientEntry;
