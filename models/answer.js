'use strict';
module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    QuestionId: DataTypes.INTEGER
  });
  Answer.associate = function({ Question }) {
    Answer.belongsTo(Question);

    // Answer will get the following instance methods:
    // Answer#setQuestion
    // Answer#getQuestion
  };

  return Answer;
};
