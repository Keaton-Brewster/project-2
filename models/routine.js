module.exports = (sequelize, DataTypes) => {
    const Routine = sequelize.define('routine', {
        routine: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Routine.associate = (models) => {
    //     Routine.belongsTo(models.Group, {
    //         onDelete: 'cascade'
    //     });
    //     Routine.hasMany(models.Task, {
    //         onDelete: 'cascade'
    //     });
    // };

    return Routine;
};