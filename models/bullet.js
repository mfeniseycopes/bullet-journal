const bulletDefn = (db, DataTypes) => {

  const Bullet = db.define('bullet', {

    type: {
      type: DataTypes.ENUM('task', 'note', 'event'),
      allowNull: false,
    },
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    body_type: {
      type: DataTypes.ENUM('markdown', 'latex'),
      allowNull: false,
      defaultValue: 'markdown',
    },
    due_date: DataTypes.DATE,
    completed_on: DataTypes.DATE,
    recurrence: DataTypes.STRING,

    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: DataTypes.INTEGER,
    next_id: DataTypes.INTEGER,
  })
  

  Bullet.associate = db => {

    Bullet.belongsTo(db.models.topic, {
      foreignKey: 'topic_id',
      as: 'topic',
    })

    Bullet.belongsTo(db.models.bullet, {
      foreignKey: 'parent_id',
      as: 'parent',
    })

    Bullet.hasMany(db.models.bullet, {
      foreignKey: 'parent_id',
      as: 'children',
      hooks: true,
      onDelete: 'CASCADE',
    })

    Bullet.belongsTo(db.models.bullet, {
      foreignKey: 'next_id',
      as: 'next',
    })

    Bullet.hasOne(db.models.bullet, {
      foreignKey: '_id',
      as: 'prev',
    })

  }

  return Bullet
}

  module.exports = bulletDefn
