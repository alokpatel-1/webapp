const pool = require("../../database/database");

exports.isEmailAlreadyUsed = async (email) => {
  try {
    if (email) {
      const query = `SELECT COUNT(*) FROM "user" WHERE email = $1`;
      const client = await pool.connect();

      const { rows } = await client.query(query, [email]);
      const isEmailAlreadyUsed = parseInt(rows[0].count, 10);
      if (isEmailAlreadyUsed > 0) {
        throw Error("Email already Used!");
      }
      return true;
    }
  } catch (error) {
    throw Error({
      status: 409,
      message: error,
    });
  }
};
