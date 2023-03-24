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
      { compatibleVehicles: { $eq: null } },
      { compatibleVehicles: { $exists: false } },
      {
        compatibleVehicles: {
          $elemMatch: {
            $and: [
              condition({ attribute: 'make', relation: '$eq', value: make }),
              condition({ attribute: 'model', relation: '$eq', value: model }),
              condition({
                attribute: 'fromYear',
                relation: '$lte',
                value: modelYear,
              }),
              condition({
                attribute: 'toYear',
                relation: '$gte',
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
