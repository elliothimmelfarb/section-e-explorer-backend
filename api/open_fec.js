const express = require('express');
const request = require('request');

const router = new express.Router();

const key = process.env.OPEN_FEC_KEY;

const baseURI = 'https://api.open.fec.gov/v1';

const schedEByCandidate = (candidateId) => `${baseURI}/schedules/schedule_e/by_candidate/?candidate_id=${candidateId}&api_key=${key}&per_page=50`;
const schedEByCommittee = (committeeId) => `${baseURI}/schedules/schedule_e/?committee_id=${committeeId}&api_key=${key}&per_page=50`;
const candidateNameSearch = (name) => `${baseURI}/names/candidates/?q=${name}&api_key=${key}&per_page=50`;
const committeeNameSearch = (name) => `${baseURI}/names/committees/?q=${name}&api_key=${key}&per_page=50`;
const schedEByCommitteeAndCandidate = (committeeId, candidateId) =>
  `${baseURI}//schedules/schedule_e/?candidate_id=${candidateId}&api_key=${key}&committee_id=${committeeId}&per_page=50`;

console.log(committeeNameSearch('HUMAN%20RIGHTS%20CAMPAIGN%20PAC'));

router.get('/', (req, res) => {
  res.send('working');
});

router.get('/search/candidate_name/:id', (req, res) => {
  request.get(candidateNameSearch(req.params.id), (err, response, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(JSON.parse(body).results);
  });
});

router.get('/search/committee_name/:id', (req, res) => {
  request.get(committeeNameSearch(req.params.id), (err, response, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(JSON.parse(body).results);
  });
});

router.get('/schedule_e/by_candidate/:id', (req, res) => {
  request.get(schedEByCandidate(req.params.id), (err, response, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(JSON.parse(body).results);
  });
});

router.get('/schedule_e/by_committee/:id', (req, res) => {
  request.get(schedEByCommittee(req.params.id), (err, response, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(JSON.parse(body).results);
  });
});

router.get('/schedule_e/by_committee/:committeeId/by_candidate/:candidateId', (req, res) => {
  request.get(schedEByCommitteeAndCandidate(req.params.committeeId, req.params.candidateId), (err, response, body) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(JSON.parse(body).results);
  });
});


module.exports = router;
