// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function scoreSubjectMatch(student, tutor) {
    let score = 0;
    for(const [subject, weight] of student) {
        const rating = +tutor.ratings.get(subject) || 0;
        score += rating * weight;
    }
    return score;
}

function computeSimilarity(a, b) {
    let similarity = 0;
    for(const [subject, rA] of a) {
        const rB = b.get(subject);
        if(rB === undefined) {
            continue;
        }
        similarity += Math.abs(rA - rB) - 0.5;
    }
    return similarity;
}

function inferRating(subject, tutors, similarities) {
    let totalRating = 0;
    let totalSimilarity = 1;
    for(let i = 0; i < tutors.length; ++i) {
        const otherTutor = tutors[i];
        const similarity = similarities[i];
        const rating = otherTutor.ratings.get(subject);
        if(rating === undefined) {
            continue;
        }
        totalRating += rating * similarity;
        totalSimilarity += Math.abs(similarity);
    }
    return Math.max(totalRating / totalSimilarity, 0);
}

function inferMissingRatings(tutors) {
    const subjects = new Set();
    const inferredTutors = [];
    for(const tutor of tutors) {
        for(const [subject, _] of tutor.ratings) {
            subjects.add(subject);
        }
        const inferredTutor = {ratings: new Map(), tutor: tutor};
        inferredTutors.push(inferredTutor);
    }
    const similarities = []
    for(const a of tutors) {
        const similaritiesRow = [];
        for(const b of tutors) {
            similaritiesRow.push(computeSimilarity(a.ratings, b.ratings));
        }
        similarities.push(similaritiesRow);
    }
    for(const subject of subjects) {
        for(let i = 0; i < tutors.length; ++i) {
            const rating = tutors[i].ratings.get(subject);
            inferredTutors[i].ratings.set(subject, rating === undefined ? inferRating(subject, tutors, similarities[i]) : rating);
        }
    }
    return inferredTutors;
}

function sortTutorsBySubjectMatch(student, tutors) {
    const inferredTutors = inferMissingRatings(tutors);
    const scored = [];
    for(const inferredTutor of inferredTutors) {
        const score = scoreSubjectMatch(student, inferredTutor);
        scored.push({score, inferredTutor});
    }
    scored.sort((a, b) => b.score - a.score);
    return scored;
}

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "T3vawC4F4A",
    password: "IlBdDMEA91",
    database:"T3vawC4F4A"
});
con.connect(function(err) {
    if (err){
        console.log(err)
        return
    }
    console.log("Connected to database!");
});

export default (req, res, postprocessor=undefined) => {
    console.log(req, res, postprocessor);
    let unsortedTutors;
    con.query(`SELECT * FROM Tutor`, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        // deep/recursive copy
        unsortedTutors = JSON.parse(JSON.stringify(result));
        console.log(unsortedTutors);
        for(const tutor of unsortedTutors) {
            tutor.ratings = new Map();
        }
        con.query(`SELECT * FROM Subject`, (err, result) => {
            if(err) {
                throw err;
            }
            for(const row of result) {
                unsortedTutors[row.TutorID].ratings.set(row.Subject.toLowerCase().replace(/\s/g, "-"), row.Rating);
            }
            console.log(req.query);
            let tutors = sortTutorsBySubjectMatch(new Map(Object.entries(req.query).map(([k, v]) => [k.toLowerCase(), v/100])), unsortedTutors);
            console.log(tutors);
            console.log(postprocessor);
            if(postprocessor !== undefined) {
                tutors = postprocessor(tutors);
            }
            console.log(tutors);
            console.log(200);
            res.status(200).json(tutors);
        });
    });
}
    
