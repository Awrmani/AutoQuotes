const condition = ({ attribute, relation, value }) => ({
  $or: [
    { [attribute]: { $exists: false } },
    { [attribute]: null },
    { [attribute]: { [relation]: value } },
  ],
});

const compatibleVehiclesConditionGenerator = ({ make, model, modelYear }) => {
  const generatedCondition = {
    $or: [
      { compatibleVehicles: { $eq: [] } },
      {
        compatibleVehicles: {
          $elemMatch: {
            $and: [
              condition({ attribute: 'make', relation: '$eq', value: make }),
              condition({ attribute: 'model', relation: '$eq', value: model }),
              condition({
                attribute: 'fromYear',
                relation: '$gte',
                value: modelYear,
              }),
              condition({
                attribute: 'toYear',
                relation: '$lte',
                value: modelYear,
              }),
            ],
          },
        },
      },
    ],
  };

  return generatedCondition;
};

module.exports = compatibleVehiclesConditionGenerator;
