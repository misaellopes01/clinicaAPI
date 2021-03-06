import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      email,
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.repository.find({
      where: {
        admin: false
      }
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.repository.findOne(user_id);
  }

  async create({ name, email, password, gender, location, phone, bi, age, admin = false }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password, gender, location, phone, bi, age, admin});

    return this.repository.save(user);
  }
}
