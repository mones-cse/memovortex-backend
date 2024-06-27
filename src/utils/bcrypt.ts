import bcrypt from 'bcrypt'
export const passowrdGenerator = (password: string) => {
    const saltRound = 10
    return bcrypt.hash(password, saltRound)
}

export const passwordCompare = (password: string, hash_password: string) => {
    return bcrypt.compare(password, hash_password)
}
