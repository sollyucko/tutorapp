import tutors from '../tutors';

export default (req, res) => {
    return tutors({query: {[req.query.subject]: 100}}, res, tutors => tutors.filter(tutor => tutor.score > 0).map(tutor => Object.assign({rating: tutor.score*4+1}, tutor.inferredTutor.tutor)));
}
