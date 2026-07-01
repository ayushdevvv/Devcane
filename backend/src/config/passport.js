import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { userModel } from "../models/user.model.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await userModel.findOne({ email });

        let isNewUser = false;

        if (!user) {
          isNewUser = true;

          user = await userModel.create({
            name: profile.displayName,
            email,
            provider: "google",
            providerId: profile.id,
            avatar: profile.photos?.[0]?.value,
            password: null,
            isVerified: true,
          });
        }

        user.isNewUser = isNewUser;

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;