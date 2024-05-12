import User from "../model/User.js";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import UserDto from "../dto/UserDto.js";
import ApiError from "../exception/apiError.js";

class UserService {
    async registration(login, email, password) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({login, email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `http://localhost:8080/api/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Не верный пароль')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})
        console.log(user);
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }

        await User.findByIdAndUpdate(user._id, {isActivated: true});
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user);
        console.log(userDto)
        const tokens = tokenService.generateToken({...userDto})
        console.log(tokens)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async getUserById(id) {
        const user = await User.findById(id)
        return user
    }
}

export default new UserService();