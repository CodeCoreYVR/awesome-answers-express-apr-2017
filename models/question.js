'use strict';
module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }
/* this style of creating classMethods and adding
   associations has been remove from Sequelize v4.

  , {
    classMethods: {
      associate: function({ Answer }) {
        Question.hasMany(Answer, {as: 'Answer'});

        // We get the following methods from hasMany:
        // Question#getAnswers
        // Question#setAnswers
        // Question#addAnswer
      }
    }
  }
*/
  );

  Question.associate = ({ Answer }) => {
    Question.hasMany(Answer);
  };

  return Question;
};
