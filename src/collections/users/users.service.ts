import { Service } from "typedi"
import UsersRepository from "./users.repository";

@Service()
export default class UsersService {
    constructor(private readonly usersRepo: UsersRepository) { }

    async getAll() {
        return await this.usersRepo.getAll()
    }
}