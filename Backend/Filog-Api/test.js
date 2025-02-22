// const bcrypt = require('bcrypt');
// bcrypt.compare("SecurePass123!","$2b$10$vMFNTQK/vAVjJD/SzhwbeuoMySBKNg2/RPELdL8VzUCdU1f2X5XO6").then((result) => {
//     console.log("Result: ", result);
// }).catch((err) => {console.log(err);});

const encoded = `http://localhost:8000/api/v1/db/users?query=${encodeURIComponent(`${JSON.stringify({filters:{userId:"67ba37cdfea0be0071bb13f9"}})}`)}`;
console.log(encoded)