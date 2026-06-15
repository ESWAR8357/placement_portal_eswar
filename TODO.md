# TODO - Coding Assessment Module (No Compiler)

## Backend
- [x] 1. Update/create MongoDB schema for CodingQuestion to include required review fields:
      title, difficulty, problemStatement, inputFormat, outputFormat, constraints,
      sampleInput, sampleOutput, explanation, solution, timeComplexity, spaceComplexity.


- [ ] 2. Update coding question seed data to include the above fields.


- [ ] 3. Add Coding Assessment routes + controllers:
      - GET assessment questions (protected)
      - POST submit assessment
      - Return score summary + per-question review objects.

- [ ] 4. Ensure score calculation is based on user status (solved/attempted/not attempted).

## Frontend
- [ ] 5. Add service layer `codingAssessmentService.js` (fetch + submit).
- [ ] 6. Add coding assessment page `CodingAssessment.jsx`:
      - timer, question palette, prev/next navigation, numbering
      - show all required fields
      - allow status marking (solved/attempted/not attempted)
      - submit flow
- [ ] 7. Add coding result page `CodingAssessmentResult.jsx`:
      - summary + review page
      - show official solution, explanation, time/space complexity
- [ ] 8. Wire routes into `frontend/src/App.jsx`.

## QA
- [ ] 9. Manual test flows:
      - start assessment
      - mark statuses
      - submit
      - verify summary + review correctness

