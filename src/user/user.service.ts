import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AddRoleDto, CreateUserDto} from "./dto";
import {Repository} from "typeorm";
import {User} from "./entities";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesService} from "src/roles/roles.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.getByEmail(createUserDto.email);

    if (existingUser) {
      throw new HttpException(
        "User with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const role = await this.roleService.getRoleByValue("User");
    const user = {...createUserDto, roles: [role]};
    return await this.userRepository.save(user);
  }

  async getAll() {
    const users = await this.userRepository.find({
      relations: ["roles"],
    });
    return users;
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ["roles"],
    });
  }

  async getById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ["roles"],
    });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.getById(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      user.roles.push(role);
      return await this.userRepository.save(user);
    }

    throw new HttpException(
      "User or role does not exist",
      HttpStatus.NOT_FOUND
    );
  }
}
