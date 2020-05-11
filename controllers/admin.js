exports.getAdminPanel = (req, res, next) => {
    res.render('admin-panel', {
        pageTitle: 'Admin panel',
        path: '/admin-panel'
    });
};