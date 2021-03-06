module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ebeb20b5ef7e75bcedea218882225d25'),
    },
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
});
