const isAuthenticated = require('../config/middleware/auth');
const db = require('../models');
const {
    Op
} = require('sequelize');
// const db = require('../models');

module.exports = (app) => {
    // load home screen

    app.get('/sign_up', (req, res) => {
        res.render('signup', {});
    });

    // login (need middleware before (req, res))
    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/users/home');
        } else {
            res.render('login', {});
        }
    });

    app.get('/users/home', isAuthenticated, async (req, res) => {
        let userGroups = await db.User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['groupsIds']
        });
        userGroups = JSON.parse(userGroups.dataValues.groupsIds);

        const userGroupsIds = [];
        if (userGroups !== 0) {
            userGroups.forEach(ele => userGroupsIds.push(ele));
        }
        const groupData = await db.Group.findAll({
            where: {
                [Op.and]: {
                    id: userGroupsIds
                }
            }
        });
        let groups = [];
        if (groupData.length > 0) {
            for (let i = 0; i < groupData.length; i++) {
                groups.push(groupData[i].dataValues);
            }
        } else {
            groups = 'no groups found';
        }
        // console.log(groups);
        res.render('homepage', {
            user: req.user,
            groups: groups
        });
    });

    app.get('/users/home/groups/:id', isAuthenticated, async (req, res) => {
        const users = await db.User.findAll({});

        const usersArr = [];
        if (users.length < 1) {
            usersArr.push(users.dataValues);
        } else {
            users.forEach(user => usersArr.push(user));
        }

        let usersInGroup = usersArr.map((user) => {
            if (user.dataValues.groupsIds.includes(req.params.id)) {
                return user.dataValues.id;
            }
            return 0;
        });
        usersInGroup.pop();

        console.log(`line 69 ${usersInGroup}`);

        usersInGroup = await db.User.findAll({
            where: {
                [Op.and]: {
                    id: usersInGroup
                }
            }
        });

        console.log('line 79', usersInGroup);


        usersInGroup = usersInGroup.map(user => {
            return user.dataValues;
        });

        console.log('line 90 usersInGroup', usersInGroup);



        db.Group.findAll({
            where: {
                id: req.params.id
            }
        }).then(groupData => {
            res.render('group_page', {
                group: groupData[0].dataValues,
                users: usersInGroup

            });
        });
        // res.render('group_page', {
        //     group: groupData[0].dataValues,
        //     users: usersInGroup
        // });

    });
    // app.get('/users/home/groups/:id', isAuthenticated, (req, res) => {
    //     db.Group.findAll({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(groupData => {
    //         res.render('group_page', {
    //             group: groupData[0].dataValues,
    // users: usersInGroup

    //         });
    //     });
    // });
};