import express from 'express';
import isAdmin from '../util/isAdmin';

export default ({ appUrl, passport }) => {
  const router = express.Router();

  router.get('/homepage', isAdmin, (req, res) => res.render('pages/admin_dashboard', { appLocation: appUrl }));

  router.get('/manage-accounts', isAdmin, (req, res) => res.render('pages/admin_manage_accounts', { appLocation: appUrl }));

  router.get('/page', isAdmin, (req, res) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, no-transform, max-age=0, post-check=0, pre-check=0');
    res.header('Pragma', 'no-cache');
    res.render('pages/admin_page', { appLocation: appUrl });
  });

  return router;
};