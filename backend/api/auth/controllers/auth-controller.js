import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Classe que cuida de toda a autenticação backend do sistema.
 * @date 10/03/2024 - 22:22:53
 *
 * @class AuthController
 * @typedef {AuthController}
 */
class AuthController {

    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    /**
     * Método responsável por validar o login do usuário
     * @date 10/03/2024 - 22:23:03
     *
     * @async
     * @param {json} body
     * @returns {json}
     */
    async login(body) {
        try {
            const { email, password } = body;

            if (!email || !password) {
                const errorMessage = `Preencha o email e a senha para realizar o Login.`;
                return { message: errorMessage, status: 400 };
            }

            const user = await this.authRepository.getUserByEmail(email);
            if (!user) {
                const errorMessage = `Email ou senha incorretos.`;
                return { message: errorMessage, status: 400 };
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                const errorMessage = `Email ou senha incorretos.`;
                return { message: errorMessage, status: 400 };
            }

            const verifyLoginSession = await this.authRepository.getUserSession(user.id);
            if (verifyLoginSession) {

                const now = new Date();
                const timestampDate = new Date(verifyLoginSession.start_login);

                const differenceInDays = (now - timestampDate) / (24 * 60 * 60 * 1000);

                if (differenceInDays > 1) {
                    await this.authRepository.deleteUserSession(verifyLoginSession.id);
                } else {

                    const token = verifyLoginSession.token;

                    return {
                        message: {
                            success: `Usuário já está logado!`,
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            token
                        },
                        status: 200
                    };
                }

            }
            const id = user.id;
            const name = user.name;
            const payload = { id, name, email };

            const token = jwt.sign({ payload }, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN,
            });

            await this.authRepository.createUserSession(id, token);

            return {
                message: {
                    success: `Login realizado com sucesso!`,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    token
                },
                status: 200
            };
        } catch (error) {
            return { message: error.message, status: 500 };
        }
    }

    /**
     * Método repsonsável por validar o logout do usuário
     * @date 10/03/2024 - 22:25:04
     *
     * @async
     * @param {json} userData
     * @returns {json}
     */
    async logout(userData) {
        try {
            await this.authRepository.deleteUserSessionByUserId(userData.payload.id);

            return {
                message: {
                    success: `Logout realizado!`
                },
                status: 200
            };

        } catch (error) {
            return { message: error.message, status: 500 };
        }
    }

}

export default AuthController;