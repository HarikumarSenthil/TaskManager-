import bcrypt from "bcrypt";

let saltRounds:any = process.env.SALT_ROUND;

export const generateHash = async (password: String) => {
  try {
    saltRounds = parseInt(saltRounds);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password.toString(), salt);
    return hash;
  } catch (error) {
   console.log(error);
   
  }
};

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
