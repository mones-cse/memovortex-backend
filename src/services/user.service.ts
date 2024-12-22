import { TNewUser } from '../config/database'
import { createUser, getUserByEmail, updateUser } from '../repositories/user.repository'
import { passowrdGenerator } from '../utils/bcrypt'
import ApiError from '../errors/ApiError'
import { serializeUser } from '../serializers/userSerializer'
import { TUser } from '@src/config/database'
import { UserAccountInfo } from '@src/types/user.types'

export const createUserService = async (user: TNewUser) => {
    const existingUser = await getUserByEmail(user.email)
    if (existingUser.length > 0) {
        throw new ApiError(409, 'Email already exists')
    }

    const hashedPassword = await passowrdGenerator(user.password)
    const createtdUser = await createUser({ ...user, password: hashedPassword })
    const serializedUser = serializeUser(createtdUser[0])
    return serializedUser
}

export const updateUserAcountInfoService = async (user: TUser, data: UserAccountInfo) => {
    const updatedUser = await updateUser(user.id, data)
    const serializedUser = serializeUser(updatedUser[0])
    return serializedUser
}
