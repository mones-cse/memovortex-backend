import bcrypt from 'bcrypt'
export const passowrdGenerator = (password: string) => {
    const saltRound = 10
    return bcrypt.hash(password, saltRound)
}
