const { Router } = require('express');
const router = Router();

const { renderSignupForm, 
        signup, 
        renderSigninForm, 
        signin, 
        logout 
      } = require('../controllers/user.controller')

router.get('/app/signup', renderSignupForm)
router.post('/app/signup', signup)
router.get('/app/signin', renderSigninForm)
router.post('/app/signin', signin)
router.get('/app/logout', logout)

module.exports = router;